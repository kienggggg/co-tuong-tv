/**
 * XIANGQI (CỜ TƯỚNG) GAME ENGINE
 * Complete standard Xiangqi rules:
 * - 90 intersections (9 files x 10 ranks)
 * - 7 Piece types: King/General (K), Advisor (A), Elephant (E), Horse (H), Chariot (R), Cannon (C), Pawn (P)
 * - Palace restrictions, River crossing rules, Hobbled Horse leg (cản mã), Elephant eye (mắt tượng),
 *   Cannon screen jump (ngòi pháo), Flying General (lộ mặt tướng), Check (Chiếu), Checkmate (Chiếu bí),
 *   and Stalemate (Hết nước đi -> xử thua).
 */

export const SIDES = {
  RED: 'r',   // Đỏ (thường đi trước)
  BLACK: 'b'  // Đen
};

export const PIECE_NAMES = {
  // Red pieces
  'K': { hanzi: '帥', name: 'Tướng', role: 'king', side: 'r' },
  'A': { hanzi: '仕', name: 'Sĩ', role: 'advisor', side: 'r' },
  'E': { hanzi: '相', name: 'Tượng', role: 'elephant', side: 'r' },
  'H': { hanzi: '傌', name: 'Mã', role: 'horse', side: 'r' },
  'R': { hanzi: '俥', name: 'Xe', role: 'chariot', side: 'r' },
  'C': { hanzi: '炮', name: 'Pháo', role: 'cannon', side: 'r' },
  'P': { hanzi: '兵', name: 'Binh', role: 'pawn', side: 'r' },
  // Black pieces
  'k': { hanzi: '將', name: 'Tướng', role: 'king', side: 'b' },
  'a': { hanzi: '士', name: 'Sĩ', role: 'advisor', side: 'b' },
  'e': { hanzi: '象', name: 'Tượng', role: 'elephant', side: 'b' },
  'h': { hanzi: '馬', name: 'Mã', role: 'horse', side: 'b' },
  'r': { hanzi: '車', name: 'Xe', role: 'chariot', side: 'b' },
  'c': { hanzi: '砲', name: 'Pháo', role: 'cannon', side: 'b' },
  'p': { hanzi: '卒', name: 'Tốt', role: 'pawn', side: 'b' }
};

export const INITIAL_FEN = "rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 1";

export class XiangqiGame {
  constructor(fen = INITIAL_FEN) {
    this.board = Array(10).fill(null).map(() => Array(9).fill(null));
    this.turn = SIDES.RED; // Red goes first
    this.history = [];
    this.moveLog = [];
    this.isGameOver = false;
    this.winner = null; // 'r', 'b', or 'draw'
    this.winReason = '';
    this.loadFromFen(fen);
  }

  /**
   * Reset game to standard start
   */
  reset() {
    this.board = Array(10).fill(null).map(() => Array(9).fill(null));
    this.turn = SIDES.RED;
    this.history = [];
    this.moveLog = [];
    this.isGameOver = false;
    this.winner = null;
    this.winReason = '';
    this.loadFromFen(INITIAL_FEN);
  }

  /**
   * End game on clock expiration
   */
  endGameByTimeout(loserSide) {
    this.isGameOver = true;
    this.winner = (loserSide === SIDES.RED) ? SIDES.BLACK : SIDES.RED;
    const loserName = (loserSide === SIDES.RED) ? 'Bên Đỏ' : 'Bên Đen';
    const winnerName = (this.winner === SIDES.RED) ? 'Bên Đỏ' : 'Bên Đen';
    this.winReason = `${loserName} hết thời gian thi đấu! ${winnerName} chiến thắng!`;
  }

  /**
   * Parse FEN string and setup board
   */
  loadFromFen(fen) {
    const parts = fen.trim().split(/\s+/);
    const rows = parts[0].split('/');
    this.board = Array(10).fill(null).map(() => Array(9).fill(null));

    for (let r = 0; r < 10; r++) {
      const rowStr = rows[r];
      let c = 0;
      for (let i = 0; i < rowStr.length; i++) {
        const ch = rowStr[i];
        if (ch >= '1' && ch <= '9') {
          c += parseInt(ch, 10);
        } else {
          // Normalize alternative FEN notations (e.g. B/b for Bishop/Elephant, N/n for Knight/Horse)
          let piece = ch;
          if (ch === 'B') piece = 'E';
          else if (ch === 'b') piece = 'e';
          else if (ch === 'N') piece = 'H';
          else if (ch === 'n') piece = 'h';

          this.board[r][c] = piece;
          c++;
        }
      }
    }

    if (parts[1]) {
      this.turn = (parts[1] === 'w' || parts[1] === 'r') ? SIDES.RED : SIDES.BLACK;
    }
  }

  /**
   * Export current board state to FEN
   */
  toFen() {
    let fen = '';
    for (let r = 0; r < 10; r++) {
      let empty = 0;
      for (let c = 0; c < 9; c++) {
        const piece = this.board[r][c];
        if (!piece) {
          empty++;
        } else {
          if (empty > 0) {
            fen += empty;
            empty = 0;
          }
          fen += piece;
        }
      }
      if (empty > 0) fen += empty;
      if (r < 9) fen += '/';
    }
    fen += ` ${this.turn === SIDES.RED ? 'r' : 'b'} - - 0 1`;
    return fen;
  }

  getPiece(r, c) {
    if (r < 0 || r > 9 || c < 0 || c > 8) return null;
    return this.board[r][c];
  }

  getPieceSide(piece) {
    if (!piece) return null;
    return piece === piece.toUpperCase() ? SIDES.RED : SIDES.BLACK;
  }

  /**
   * Check if coordinate is in Red or Black Palace
   */
  isInPalace(r, c, side) {
    if (c < 3 || c > 5) return false;
    if (side === SIDES.RED) {
      return r >= 7 && r <= 9;
    } else {
      return r >= 0 && r <= 2;
    }
  }

  /**
   * Check if piece has crossed the river
   */
  hasCrossedRiver(r, side) {
    if (side === SIDES.RED) {
      return r <= 4;
    } else {
      return r >= 5;
    }
  }

  /**
   * Find General's position for given side
   */
  findKing(side) {
    const kingChar = side === SIDES.RED ? 'K' : 'k';
    const minRow = side === SIDES.RED ? 7 : 0;
    const maxRow = side === SIDES.RED ? 9 : 2;
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = 3; c <= 5; c++) {
        if (this.board[r][c] === kingChar) {
          return { r, c };
        }
      }
    }
    // Fallback: search whole board if king is out of bounds in custom position
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        if (this.board[r][c] === kingChar) {
          return { r, c };
        }
      }
    }
    return null;
  }

  /**
   * Flying General Rule (Lộ mặt tướng):
   * Two Kings cannot face each other on the same column without pieces between them.
   */
  isFlyingGeneral() {
    const redKing = this.findKing(SIDES.RED);
    const blackKing = this.findKing(SIDES.BLACK);
    if (!redKing || !blackKing) return false;
    if (redKing.c !== blackKing.c) return false;

    const col = redKing.c;
    const startR = Math.min(redKing.r, blackKing.r) + 1;
    const endR = Math.max(redKing.r, blackKing.r);

    for (let r = startR; r < endR; r++) {
      if (this.board[r][col]) {
        return false; // Has blocking piece
      }
    }
    return true; // No pieces between -> illegal!
  }

  /**
   * Generate pseudo-legal moves for a piece at (r, c)
   */
  generateMovesForPiece(r, c) {
    const piece = this.board[r][c];
    if (!piece) return [];
    const side = this.getPieceSide(piece);
    const type = piece.toLowerCase();
    const moves = [];

    const addMoveIfValid = (nr, nc) => {
      if (nr < 0 || nr > 9 || nc < 0 || nc > 8) return false;
      const target = this.board[nr][nc];
      if (!target) {
        moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: null });
        return true;
      }
      if (this.getPieceSide(target) !== side) {
        moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: target });
      }
      return false; // Blocked by piece
    };

    switch (type) {
      case 'k': { // General / King
        const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of deltas) {
          const nr = r + dr;
          const nc = c + dc;
          if (this.isInPalace(nr, nc, side)) {
            addMoveIfValid(nr, nc);
          }
        }
        break;
      }

      case 'a': { // Advisor
        const deltas = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [dr, dc] of deltas) {
          const nr = r + dr;
          const nc = c + dc;
          if (this.isInPalace(nr, nc, side)) {
            addMoveIfValid(nr, nc);
          }
        }
        break;
      }

      case 'e': { // Elephant
        const deltas = [
          { dr: -2, dc: -2, eyeR: r - 1, eyeC: c - 1 },
          { dr: -2, dc: 2,  eyeR: r - 1, eyeC: c + 1 },
          { dr: 2,  dc: -2, eyeR: r + 1, eyeC: c - 1 },
          { dr: 2,  dc: 2,  eyeR: r + 1, eyeC: c + 1 }
        ];
        for (const d of deltas) {
          const nr = r + d.dr;
          const nc = c + d.dc;
          // Target square must be within board bounds
          if (nr < 0 || nr > 9 || nc < 0 || nc > 8) continue;
          // Elephant cannot cross river
          if (side === SIDES.RED && nr < 5) continue;
          if (side === SIDES.BLACK && nr > 4) continue;
          // Elephant eye must be within board bounds
          if (d.eyeR < 0 || d.eyeR > 9 || d.eyeC < 0 || d.eyeC > 8) continue;
          // Check elephant eye (mắt tượng)
          if (this.board[d.eyeR][d.eyeC] === null) {
            addMoveIfValid(nr, nc);
          }
        }
        break;
      }

      case 'h': { // Horse
        // 8 possible moves, checked against 4 obstacle legs
        const horseSteps = [
          // Moving up: obstacle at (r-1, c)
          { legR: r - 1, legC: c, targets: [[r - 2, c - 1], [r - 2, c + 1]] },
          // Moving down: obstacle at (r+1, c)
          { legR: r + 1, legC: c, targets: [[r + 2, c - 1], [r + 2, c + 1]] },
          // Moving left: obstacle at (r, c-1)
          { legR: r, legC: c - 1, targets: [[r - 1, c - 2], [r + 1, c - 2]] },
          // Moving right: obstacle at (r, c+1)
          { legR: r, legC: c + 1, targets: [[r - 1, c + 2], [r + 1, c + 2]] }
        ];

        for (const step of horseSteps) {
          if (step.legR >= 0 && step.legR <= 9 && step.legC >= 0 && step.legC <= 8) {
            if (this.board[step.legR][step.legC] === null) {
              for (const [nr, nc] of step.targets) {
                addMoveIfValid(nr, nc);
              }
            }
          }
        }
        break;
      }

      case 'r': { // Chariot (Xe)
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
          let nr = r + dr;
          let nc = c + dc;
          while (nr >= 0 && nr <= 9 && nc >= 0 && nc <= 8) {
            const target = this.board[nr][nc];
            if (!target) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: null });
            } else {
              if (this.getPieceSide(target) !== side) {
                moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: target });
              }
              break; // Blocked
            }
            nr += dr;
            nc += dc;
          }
        }
        break;
      }

      case 'c': { // Cannon (Pháo)
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
          let nr = r + dr;
          let nc = c + dc;
          let hasJumped = false;

          while (nr >= 0 && nr <= 9 && nc >= 0 && nc <= 8) {
            const target = this.board[nr][nc];
            if (!hasJumped) {
              if (!target) {
                moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: null });
              } else {
                hasJumped = true; // First piece encountered acts as screen/ngòi
              }
            } else {
              if (target) {
                if (this.getPieceSide(target) !== side) {
                  moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, captured: target });
                }
                break; // Cannon can only jump one screen
              }
            }
            nr += dr;
            nc += dc;
          }
        }
        break;
      }

      case 'p': { // Pawn (Binh/Tốt)
        const forward = side === SIDES.RED ? -1 : 1;
        // Always can move forward 1 step
        addMoveIfValid(r + forward, c);

        // After crossing river, can also move left and right
        if (this.hasCrossedRiver(r, side)) {
          addMoveIfValid(r, c - 1);
          addMoveIfValid(r, c + 1);
        }
        break;
      }
    }

    return moves;
  }

  /**
   * Check if a given side is in check
   */
  isCheck(side) {
    const king = this.findKing(side);
    if (!king) return true; // King lost or missing
    const enemySide = side === SIDES.RED ? SIDES.BLACK : SIDES.RED;

    // Check if any enemy piece can capture the king
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const piece = this.board[r][c];
        if (piece && this.getPieceSide(piece) === enemySide) {
          const pseudoMoves = this.generateMovesForPiece(r, c);
          for (const m of pseudoMoves) {
            if (m.to.r === king.r && m.to.c === king.c) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * Get all fully legal moves for the specified side (default: current turn)
   */
  getLegalMoves(side = this.turn) {
    const legalMoves = [];

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const piece = this.board[r][c];
        if (piece && this.getPieceSide(piece) === side) {
          const pseudoMoves = this.generateMovesForPiece(r, c);
          for (const move of pseudoMoves) {
            // Test move on virtual board
            this.makeMoveInternal(move);
            const inCheck = this.isCheck(side);
            const flying = this.isFlyingGeneral();
            this.undoMoveInternal(move);

            if (!inCheck && !flying) {
              legalMoves.push(move);
            }
          }
        }
      }
    }

    return legalMoves;
  }

  /**
   * Get legal moves for a specific piece at (r, c)
   */
  getLegalMovesForPiece(r, c) {
    const piece = this.board[r][c];
    if (!piece || this.getPieceSide(piece) !== this.turn) return [];

    const pseudoMoves = this.generateMovesForPiece(r, c);
    const legalMoves = [];

    for (const move of pseudoMoves) {
      this.makeMoveInternal(move);
      const inCheck = this.isCheck(this.turn);
      const flying = this.isFlyingGeneral();
      this.undoMoveInternal(move);

      if (!inCheck && !flying) {
        legalMoves.push(move);
      }
    }

    return legalMoves;
  }

  /**
   * Fast internal move execution without history/checks
   */
  makeMoveInternal(move) {
    this.board[move.to.r][move.to.c] = move.piece;
    this.board[move.from.r][move.from.c] = null;
  }

  undoMoveInternal(move) {
    this.board[move.from.r][move.from.c] = move.piece;
    this.board[move.to.r][move.to.c] = move.captured;
  }

  /**
   * Format move to Vietnamese notation (e.g., Pháo 2 bình 5, Xe 9 tiến 1)
   */
  getNotation(move) {
    const pieceInfo = PIECE_NAMES[move.piece];
    if (!pieceInfo) return '';
    const side = pieceInfo.side;

    // In Xiangqi, columns are numbered 1 to 9 from player's right to left
    // For Red: col 8 is 1, col 0 is 9 (colIndex = 8 - c)
    // For Black: col 0 is 1, col 8 is 9 (colIndex = c)
    const fromCol = side === SIDES.RED ? (9 - move.from.c) : (move.from.c + 1);
    const toCol = side === SIDES.RED ? (9 - move.to.c) : (move.to.c + 1);

    const name = pieceInfo.name;
    const dy = move.to.r - move.from.r;

    if (move.from.r === move.to.r) {
      return `${name} ${fromCol} bình ${toCol}`;
    }

    const isForward = side === SIDES.RED ? (dy < 0) : (dy > 0);
    const action = isForward ? 'tiến' : 'thoái';

    if (['Mã', 'Tượng', 'Sĩ'].includes(name)) {
      return `${name} ${fromCol} ${action} ${toCol}`;
    } else {
      const steps = Math.abs(dy);
      return `${name} ${fromCol} ${action} ${steps}`;
    }
  }

  /**
   * Execute move in the game
   */
  makeMove(move) {
    if (this.isGameOver) return false;

    // Check if move is in legal moves
    const legalMoves = this.getLegalMovesForPiece(move.from.r, move.from.c);
    const matchedMove = legalMoves.find(
      m => m.to.r === move.to.r && m.to.c === move.to.c
    );

    if (!matchedMove) return false;

    // Record history
    const notation = this.getNotation(matchedMove);
    this.history.push({
      ...matchedMove,
      notation,
      turn: this.turn,
      fenBefore: this.toFen()
    });
    this.moveLog.push(notation);

    // Apply move
    this.makeMoveInternal(matchedMove);

    // Switch turn
    this.turn = this.turn === SIDES.RED ? SIDES.BLACK : SIDES.RED;

    // Check Game Over conditions
    const nextLegalMoves = this.getLegalMoves(this.turn);
    if (nextLegalMoves.length === 0) {
      this.isGameOver = true;
      const isCheck = this.isCheck(this.turn);
      this.winner = this.turn === SIDES.RED ? SIDES.BLACK : SIDES.RED;
      const winnerName = this.winner === SIDES.RED ? 'Bên Đỏ' : 'Bên Đen';
      if (isCheck) {
        this.winReason = `Chiếu bí! ${winnerName} giành chiến thắng!`;
      } else {
        this.winReason = `Hết nước đi (Vây khốn)! ${winnerName} giành chiến thắng!`;
      }
    }

    return true;
  }

  /**
   * Undo last move
   */
  undo() {
    if (this.history.length === 0) return null;
    const lastMove = this.history.pop();
    this.moveLog.pop();
    this.undoMoveInternal(lastMove);
    this.turn = lastMove.turn;
    this.isGameOver = false;
    this.winner = null;
    this.winReason = '';
    return lastMove;
  }

  /**
   * Get last executed move
   */
  getLastMove() {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }
}
