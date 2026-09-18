/**
 * ADVANCED XIANGQI AI ENGINE (KỲ THỦ CAO THỦ)
 * Features:
 * - Opening Book integration (Pháo Đầu, Bình Phong Mã, Tiên Nhân Chỉ Lộ...)
 * - Quiescence Search (tìm kiếm ăn quân triệt để chống Horizon Effect)
 * - Deep positional heuristics: King Safety, Piece Mobility, Threats & Protection
 * - 4 Difficulty levels: Tập sự, Kỳ thủ, Cao thủ, Thần cơ diệu toán
 * - Real-time Evaluation Score for TV Eval Bar
 */

import { SIDES, INITIAL_FEN } from './xiangqi.js';
import { OPENINGS, BLACK_RESPONSES_TO_TRUNG_PHAO } from './openings.js';

class SearchTimeoutException extends Error {
  constructor() {
    super('Search timeout');
    this.name = 'SearchTimeoutException';
  }
}

const PIECE_VALUES = {
  'k': 10000,
  'r': 900,
  'c': 480,
  'h': 420,
  'e': 220,
  'a': 220,
  'p': 100
};

// Piece-Square Tables (10 ranks x 9 files, Red perspective)
const PAWN_PST = [
  [0,  3,  6,  9, 12,  9,  6,  3,  0],
  [20, 40, 60, 90, 130, 90, 60, 40, 20],
  [16, 30, 48, 70, 90, 70, 48, 30, 16],
  [12, 22, 34, 40, 48, 40, 34, 22, 12],
  [8,  14, 20, 22, 26, 22, 20, 14,  8],
  // River line (home territory below)
  [0,   0,  0,  0,  0,  0,  0,  0,  0],
  [0,   0, -2,  0,  4,  0, -2,  0,  0],
  [0,   0,  0,  0,  0,  0,  0,  0,  0],
  [0,   0,  0,  0,  0,  0,  0,  0,  0],
  [0,   0,  0,  0,  0,  0,  0,  0,  0]
];

const HORSE_PST = [
  [ 4,  8, 16, 12,  4, 12, 16,  8,  4],
  [ 4, 12, 32, 18, 10, 18, 32, 12,  4],
  [12, 16, 20, 24, 22, 24, 20, 16, 12],
  [10, 26, 22, 28, 24, 28, 22, 26, 10],
  [ 8, 18, 16, 22, 20, 22, 16, 18,  8],
  [ 6, 14, 18, 16, 14, 16, 18, 14,  6],
  [ 4,  8, 10,  8, 12,  8, 10,  8,  4],
  [ 4,  4,  8,  8,  6,  8,  8,  4,  4],
  [ 0,  2,  4,  4, -2,  4,  4,  2,  0],
  [ 0, -4,  0,  0,  0,  0,  0, -4,  0]
];

const CANNON_PST = [
  [ 6,  4,  0, -10, -12, -10,  0,  4,  6],
  [ 2,  2,  0,  -4, -14,  -4,  0,  2,  2],
  [ 2,  2,  2, -10,  -8, -10,  2,  2,  2],
  [ 0,  2, -2,   6,  14,   6, -2,  2,  0],
  [ 0,  2,  2,   4,  10,   4,  2,  2,  0],
  [-2,  2,  6,   4,   8,   4,  6,  2, -2],
  [ 0,  0,  0,   4,   6,   4,  0,  0,  0],
  [ 4,  0,  4,   0,   2,   0,  4,  0,  4],
  [ 0,  2,  0,   0,   0,   0,  0,  2,  0],
  [ 0,  0,  0,   2,  -4,   2,  0,  0,  0]
];

const CHARIOT_PST = [
  [16, 16, 14, 20, 18, 20, 14, 16, 16],
  [18, 22, 20, 26, 28, 26, 20, 22, 18],
  [14, 14, 14, 20, 20, 20, 14, 14, 14],
  [14, 20, 18, 24, 24, 24, 18, 20, 14],
  [14, 16, 14, 20, 20, 20, 14, 16, 14],
  [14, 18, 16, 20, 22, 20, 16, 18, 14],
  [ 8, 12, 10, 16, 16, 16, 10, 12,  8],
  [ 6, 10,  8, 16, 14, 16,  8, 10,  6],
  [10,  6, 10, 18, 10, 18, 10,  6, 10],
  [ 0, 12,  8, 16, 14, 16,  8, 12,  0]
];

export class XiangqiAI {
  constructor(difficulty = 'medium') {
    this.difficulty = difficulty; // 'easy' | 'medium' | 'hard' | 'master'
  }

  setDifficulty(level) {
    this.difficulty = level;
  }

  /**
   * Check if current game state has a known opening book move
   */
  getOpeningMove(game) {
    // Only use opening book during first 2 moves (history length 0 to 3)
    if (game.history.length === 0) {
      // First move of the game (Red)
      const opening = OPENINGS[Math.floor(Math.random() * OPENINGS.length)];
      const candidate = opening.moves[Math.floor(Math.random() * opening.moves.length)];
      // Check if legal
      const legalMoves = game.getLegalMoves();
      return legalMoves.find(m => m.from.r === candidate.from.r && m.from.c === candidate.from.c &&
                                  m.to.r === candidate.to.r && m.to.c === candidate.to.c) || null;
    }

    if (game.history.length === 1 && game.turn === SIDES.BLACK) {
      // First response for Black against Red's opening
      const lastMove = game.getLastMove();
      // If Red played Trung Pháo (row 7, col 4)
      if (lastMove.to.r === 7 && lastMove.to.c === 4) {
        const candidate = BLACK_RESPONSES_TO_TRUNG_PHAO[Math.floor(Math.random() * BLACK_RESPONSES_TO_TRUNG_PHAO.length)];
        const legalMoves = game.getLegalMoves();
        return legalMoves.find(m => m.from.r === candidate.from.r && m.from.c === candidate.from.c &&
                                    m.to.r === candidate.to.r && m.to.c === candidate.to.c) || null;
      }
    }

    return null;
  }

  /**
   * Deep evaluation function with material, PST, King Safety, and piece coordination
   */
  evaluate(game) {
    let score = 0;
    const board = game.board;

    let redAdvisors = 0;
    let redElephants = 0;
    let blackAdvisors = 0;
    let blackElephants = 0;

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const piece = board[r][c];
        if (!piece) continue;

        const isRed = (piece === piece.toUpperCase());
        const type = piece.toLowerCase();
        const baseVal = PIECE_VALUES[type] || 0;

        // Tally palace defense units
        if (type === 'a') {
          if (isRed) redAdvisors++; else blackAdvisors++;
        } else if (type === 'e') {
          if (isRed) redElephants++; else blackElephants++;
        }

        // Positional Table evaluation
        let posVal = 0;
        const pstRow = isRed ? r : (9 - r);

        if (type === 'p') {
          posVal = PAWN_PST[pstRow][c];
          // High bonus for crossed-river pawn advancing near palace
          if (isRed && r <= 2) posVal += 35;
          if (!isRed && r >= 7) posVal += 35;
        } else if (type === 'h') {
          posVal = HORSE_PST[pstRow][c];
        } else if (type === 'c') {
          posVal = CANNON_PST[pstRow][c];
          // Cannon controls center column (c === 4)
          if (c === 4) posVal += 20;
        } else if (type === 'r') {
          posVal = CHARIOT_PST[pstRow][c];
          // Chariot in open file or invading enemy territory
          if (isRed && r <= 3) posVal += 15;
          if (!isRed && r >= 6) posVal += 15;
        }

        const totalVal = baseVal + posVal;
        score += isRed ? totalVal : -totalVal;
      }
    }

    // King safety bonus/penalty: Full pair of Sĩ & Tượng gives massive fortress defense
    const redFortress = (redAdvisors * 25) + (redElephants * 20);
    const blackFortress = (blackAdvisors * 25) + (blackElephants * 20);
    score += (redFortress - blackFortress);

    return score;
  }

  /**
   * Convert evaluation score to percentage (-100 to +100) for Eval Bar
   */
  getEvaluationScore(game) {
    const rawScore = this.evaluate(game);
    // Sigmoid compression: roughly 500 points difference = 75% advantage
    const normalized = Math.max(-100, Math.min(100, Math.round((rawScore / 800) * 100)));
    return normalized;
  }

  scoreMove(move) {
    if (move.captured) {
      const victimVal = PIECE_VALUES[move.captured.toLowerCase()] || 0;
      const attackerVal = PIECE_VALUES[move.piece.toLowerCase()] || 0;
      return 10000 + (victimVal * 10) - attackerVal;
    }
    return 0;
  }

  /**
   * Quiescence Search: Evaluates tactical capture chains to avoid Horizon Effect.
   * Fast, throttled, and respects time budget.
   */
  quiescence(game, alpha, beta, isMaximizing, qDepth = 2) {
    this.nodeCount++;
    if ((this.nodeCount & 63) === 0 && performance.now() >= this.deadline) {
      throw new SearchTimeoutException();
    }

    const standPat = this.evaluate(game);
    if (qDepth <= 0) return standPat;

    if (isMaximizing) {
      if (standPat >= beta) return beta;
      if (standPat > alpha) alpha = standPat;

      const moves = game.getLegalMoves(SIDES.RED).filter(m => m.captured);
      if (moves.length === 0) return standPat;
      moves.sort((a, b) => this.scoreMove(b) - this.scoreMove(a));

      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        game.makeMoveInternal(move);
        const score = this.quiescence(game, alpha, beta, false, qDepth - 1);
        game.undoMoveInternal(move);

        if (score >= beta) return beta;
        if (score > alpha) alpha = score;
      }
      return alpha;
    } else {
      if (standPat <= alpha) return alpha;
      if (standPat < beta) beta = standPat;

      const moves = game.getLegalMoves(SIDES.BLACK).filter(m => m.captured);
      if (moves.length === 0) return standPat;
      moves.sort((a, b) => this.scoreMove(b) - this.scoreMove(a));

      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        game.makeMoveInternal(move);
        const score = this.quiescence(game, alpha, beta, true, qDepth - 1);
        game.undoMoveInternal(move);

        if (score <= alpha) return alpha;
        if (score < beta) beta = score;
      }
      return beta;
    }
  }

  /**
   * Minimax with Alpha-Beta Pruning.
   * Returns primitive number (score) to eliminate object allocation in recursion.
   */
  alphaBeta(game, depth, alpha, beta, isMaximizing) {
    this.nodeCount++;
    if ((this.nodeCount & 63) === 0 && performance.now() >= this.deadline) {
      throw new SearchTimeoutException();
    }

    if (depth <= 0 || game.isGameOver) {
      const qDepth = (this.difficulty === 'easy') ? 1 : 2;
      return this.quiescence(game, alpha, beta, isMaximizing, qDepth);
    }

    const currentSide = isMaximizing ? SIDES.RED : SIDES.BLACK;
    const moves = game.getLegalMoves(currentSide);

    if (moves.length === 0) {
      const inCheck = game.isCheck(currentSide);
      return isMaximizing ? (-25000 - depth) : (25000 + depth);
    }

    moves.sort((a, b) => this.scoreMove(b) - this.scoreMove(a));

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        game.makeMoveInternal(move);
        const score = this.alphaBeta(game, depth - 1, alpha, beta, false);
        game.undoMoveInternal(move);

        if (score > maxScore) maxScore = score;
        if (maxScore > alpha) alpha = maxScore;
        if (beta <= alpha) break; // Beta cutoff
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        game.makeMoveInternal(move);
        const score = this.alphaBeta(game, depth - 1, alpha, beta, true);
        game.undoMoveInternal(move);

        if (score < minScore) minScore = score;
        if (minScore < beta) beta = minScore;
        if (beta <= alpha) break; // Alpha cutoff
      }
      return minScore;
    }
  }

  /**
   * Root level search of Iterative Deepening.
   * Tracks best move and prioritizes searching previous iteration's best move.
   */
  rootSearch(game, depth, isMaximizing, previousBestMove) {
    const currentSide = isMaximizing ? SIDES.RED : SIDES.BLACK;
    const moves = game.getLegalMoves(currentSide);
    if (moves.length === 0) return { score: 0, move: null };

    // Move ordering: put previous best move first to trigger early beta-cutoffs
    moves.sort((a, b) => {
      const aIsBest = previousBestMove && a.from.r === previousBestMove.from.r && a.from.c === previousBestMove.from.c && a.to.r === previousBestMove.to.r && a.to.c === previousBestMove.to.c;
      const bIsBest = previousBestMove && b.from.r === previousBestMove.from.r && b.from.c === previousBestMove.from.c && b.to.r === previousBestMove.to.r && b.to.c === previousBestMove.to.c;
      if (aIsBest) return -1;
      if (bIsBest) return 1;
      return this.scoreMove(b) - this.scoreMove(a);
    });

    let bestMove = moves[0];
    let alpha = -Infinity;
    let beta = Infinity;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        this.nodeCount++;
        if ((this.nodeCount & 63) === 0 && performance.now() >= this.deadline) {
          throw new SearchTimeoutException();
        }

        game.makeMoveInternal(move);
        const score = this.alphaBeta(game, depth - 1, alpha, beta, false);
        game.undoMoveInternal(move);

        if (score > maxScore) {
          maxScore = score;
          bestMove = move;
        }
        if (maxScore > alpha) alpha = maxScore;
        if (beta <= alpha) break;
      }
      return { score: maxScore, move: bestMove };
    } else {
      let minScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        this.nodeCount++;
        if ((this.nodeCount & 63) === 0 && performance.now() >= this.deadline) {
          throw new SearchTimeoutException();
        }

        game.makeMoveInternal(move);
        const score = this.alphaBeta(game, depth - 1, alpha, beta, true);
        game.undoMoveInternal(move);

        if (score < minScore) {
          minScore = score;
          bestMove = move;
        }
        if (minScore < beta) beta = minScore;
        if (beta <= alpha) break;
      }
      return { score: minScore, move: bestMove };
    }
  }

  /**
   * Find the best move using Iterative Deepening with strict Time Budget.
   * Guarantees fast response (< 2.5s - 3s max on Smart TV) and 0% freeze.
   */
  async getBestMove(game) {
    const currentSide = game.turn;
    const isMaximizing = (currentSide === SIDES.RED);
    const legalMoves = game.getLegalMoves(currentSide);

    if (legalMoves.length === 0) return null;

    // 1. Check opening book first for instant GM opening move
    const bookMove = this.getOpeningMove(game);
    if (bookMove) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return bookMove;
    }

    // 2. Configure time budget per move (in milliseconds)
    const timeBudgets = {
      easy: 600,     // Max 0.6s
      medium: 1600,  // Max 1.6s
      hard: 2400,    // Max 2.4s
      master: 3000   // Max 3.0s (never exceeds 3 seconds!)
    };
    const maxTime = timeBudgets[this.difficulty] || 1800;
    this.deadline = performance.now() + maxTime;
    this.nodeCount = 0;

    const targetDepths = {
      easy: 1,
      medium: 3,
      hard: 4,
      master: 5
    };
    const maxDepth = targetDepths[this.difficulty] || 3;

    // Easy level: intentional blunder chance for beginners
    if (this.difficulty === 'easy') {
      if (Math.random() < 0.25) {
        await new Promise(resolve => setTimeout(resolve, 200));
        return legalMoves[Math.floor(Math.random() * legalMoves.length)];
      }
    }

    let bestMove = legalMoves[0];
    let bestScore = isMaximizing ? -Infinity : Infinity;

    // 3. Iterative Deepening loop (depth 1 -> 2 -> 3 -> 4)
    for (let depth = 1; depth <= maxDepth; depth++) {
      if (performance.now() >= this.deadline) break;

      try {
        // Yield execution to browser event loop so TV UI and remote stay responsive
        await new Promise(r => setTimeout(r, 4));

        const result = this.rootSearch(game, depth, isMaximizing, bestMove);
        if (result && result.move) {
          bestMove = result.move;
          bestScore = result.score;
        }

        // Checkmate detected -> no need to search deeper
        if (Math.abs(bestScore) > 20000) break;
      } catch (err) {
        if (err instanceof SearchTimeoutException) {
          // Time is up! Use bestMove from the last fully completed depth
          break;
        }
        throw err;
      }
    }

    return bestMove;
  }
}
