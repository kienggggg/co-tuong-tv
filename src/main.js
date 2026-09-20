/**
 * XIANGQI SMART TV APPLICATION ORCHESTRATOR
 * Pairs Game Engine, Grandmaster AI, Web Audio Synthesizer with Screen Shake,
 * Board View with Eval Bar & Captured Dock, TV Remote Navigation, and Cinematic Home Screen.
 */

import './style.css';
import { XiangqiGame, SIDES, PIECE_NAMES } from './engine/xiangqi.js';
import { XiangqiAI } from './engine/ai.js';
import { sound } from './audio/sound.js';
import { BoardView } from './ui/boardView.js';
import { TVInputController } from './input/remote.js';
import { TVMenuController } from './ui/tvMenu.js';
import { HomeScreen } from './ui/homeScreen.js';

class XiangqiTVApp {
  constructor() {
    if (window.tvLog) window.tvLog('1. XiangqiTVApp constructor start');
    this.game = new XiangqiGame();
    if (window.tvLog) window.tvLog('2. XiangqiGame created');
    this.ai = new XiangqiAI('medium');
    if (window.tvLog) window.tvLog('3. XiangqiAI created');

    // App Preferences
    this.gameMode = 'vs-ai'; // 'vs-ai' | '2-player'
    this.playerSide = SIDES.RED;
    this.difficulty = 'medium'; // 'easy' | 'medium' | 'hard' | 'master'
    this.showLabels = false; // Mặc định: Chữ Hán to rõ, chuẩn bàn cờ gỗ phòng khách

    // Time Control Clock State (Giây, 0 = không giới hạn)
    this.timeLimit = 600; // Mặc định 10 phút
    this.redTime = 600;
    this.blackTime = 600;
    this.clockInterval = null;

    // Turn & Interaction State
    this.selectedSquare = null;
    this.legalMoves = [];
    this.isAiThinking = false;
    this.hintMove = null;

    if (window.tvLog) window.tvLog('4. Before calling this.init()');
    this.init();
    if (window.tvLog) window.tvLog('5. After calling this.init()');
  }

  init() {
    // 1. Initialize Board View
    const boardContainer = document.getElementById('board-container');
    if (window.tvLog) window.tvLog('init 1. boardContainer=' + Boolean(boardContainer));
    this.boardView = new BoardView(boardContainer, {
      showVietnameseLabels: this.showLabels,
      onCellClick: (r, c) => this.handleCellClick(r, c),
      onCellHover: (r, c) => this.handleCellHover(r, c)
    });
    if (window.tvLog) window.tvLog('init 2. BoardView created');

    // 2. Connect sound engine to board shake
    sound.setShakeCallback((intensity) => {
      this.boardView.triggerScreenShake(intensity);
    });

    // 3. Initialize TV Menu & HUD
    this.menuController = new TVMenuController(this, {
      sidebarContainer: document.getElementById('sidebar-container'),
      bottomBarContainer: document.getElementById('bottom-bar-container'),
      modalContainer: document.getElementById('modal-container')
    });
    if (window.tvLog) window.tvLog('init 3. TVMenuController created');

    // 4. Initialize Cinematic TV Home Screen
    const homeContainer = document.getElementById('home-screen-container');
    if (window.tvLog) window.tvLog('init 4. homeContainer=' + Boolean(homeContainer));
    this.homeScreen = new HomeScreen(homeContainer, {
      onStartVsAi: (diff, side, timeLimit) => this.startVsAiGame(diff, side, timeLimit),
      onStartTwoPlayer: (timeLimit) => this.startTwoPlayerGame(timeLimit),
      onStartPuzzle: (puzzle) => this.startPuzzleGame(puzzle)
    });
    if (window.tvLog) window.tvLog('init 5. HomeScreen created');

    // 5. Initialize TV Remote Controller (starts in 'home' area)
    this.inputController = new TVInputController({
      initialArea: 'home',
      onHomeKey: (e) => this.homeScreen.handleKeyDown(e),
      onCursorMove: (r, c) => this.boardView.updateTVCursor(r, c),
      onSelectCell: (r, c) => this.handleCellClick(r, c),
      onBack: () => this.handleBack(),
      onColorKey: (color) => this.handleColorKey(color),
      onSidebarFocusChange: (idx) => this.menuController.updateSidebarFocus(idx),
      onSidebarSelect: (idx) => {
        const btns = this.menuController.getSidebarButtons();
        if (btns[idx]) btns[idx].click();
      },
      getSidebarButtons: () => this.menuController.getSidebarButtons(),
      getModalButtons: () => this.menuController.getModalButtons()
    });
    if (window.tvLog) window.tvLog('init 6. TVInputController created');

    // Initial render
    this.render();
    if (window.tvLog) window.tvLog('init 7. Initial render done');
  }

  returnToHomeScreen() {
    this.stopClock();
    this.homeScreen.show();
    this.inputController.setArea('home');
  }

  startVsAiGame(difficulty, side, timeLimit = 600) {
    this.gameMode = 'vs-ai';
    this.difficulty = difficulty;
    this.playerSide = side;
    this.timeLimit = (timeLimit !== undefined) ? timeLimit : 600;
    this.ai.setDifficulty(difficulty);

    const textMode = document.getElementById('text-mode');
    if (textMode) textMode.textContent = 'Chế độ: Đấu với Máy';

    const diffNames = { easy: 'Dễ (Tập sự)', medium: 'Trung bình (Kỳ thủ)', hard: 'Khó (Cao thủ)', master: 'Thần cơ 👑' };
    const textDiff = document.getElementById('text-difficulty');
    if (textDiff) textDiff.textContent = `Độ khó: ${diffNames[difficulty] || difficulty}`;

    const textSide = document.getElementById('text-player-side');
    if (textSide) textSide.textContent = (side === SIDES.RED) ? 'Phe bạn: Đỏ (Đi trước)' : 'Phe bạn: Đen (Đi sau)';

    this.inputController.setArea('board');
    this.resetGame();
  }

  startTwoPlayerGame(timeLimit = 600) {
    this.gameMode = '2-player';
    this.playerSide = SIDES.RED;
    this.timeLimit = (timeLimit !== undefined) ? timeLimit : 600;

    const textMode = document.getElementById('text-mode');
    if (textMode) textMode.textContent = 'Chế độ: 2 Người chơi';

    this.inputController.setArea('board');
    this.resetGame();
  }

  startPuzzleGame(puzzle) {
    this.gameMode = 'vs-ai';
    this.playerSide = SIDES.RED;
    this.difficulty = 'hard';
    this.timeLimit = 0; // Puzzles have no time pressure
    this.ai.setDifficulty('hard');

    this.game.loadFromFen(puzzle.fen);
    this.selectedSquare = null;
    this.legalMoves = [];
    this.hintMove = null;

    const textMode = document.getElementById('text-mode');
    if (textMode) textMode.textContent = `Thế cờ: ${puzzle.title}`;

    this.inputController.setArea('board');
    this.resetClocks(0);
    this.render();
    sound.speakVoice(puzzle.title);
  }

  isHumanTurn() {
    if (this.isAiThinking || this.game.isGameOver || this.boardView.isAnimating) return false;
    if (this.gameMode === '2-player') return true;
    return this.game.turn === this.playerSide;
  }

  handleCellHover(r, c) {
    if (this.boardView.isAnimating) return;
    if (this.inputController.area !== 'modal' && this.inputController.area !== 'home') {
      this.inputController.setCursor(r, c);
      this.menuController.updateSidebarFocus(-1);
    }
  }

  handleCellClick(r, c) {
    if (this.boardView.isAnimating) return;
    if (this.inputController.area !== 'modal' && this.inputController.area !== 'home') {
      this.inputController.setCursor(r, c);
      this.menuController.updateSidebarFocus(-1);
    }
    if (!this.isHumanTurn()) return;

    const piece = this.game.getPiece(r, c);
    const pieceSide = this.game.getPieceSide(piece);

    // Case 1: No piece currently selected
    if (!this.selectedSquare) {
      if (piece && pieceSide === this.game.turn) {
        this.selectedSquare = { r, c };
        this.legalMoves = this.game.getLegalMovesForPiece(r, c);
        this.hintMove = null;
        sound.playSelect();
        this.render();
      }
      return;
    }

    // Case 2: A piece is already selected
    const isTarget = this.legalMoves.find(m => m.to.r === r && m.to.c === c);

    if (isTarget) {
      this.executeMove(isTarget);
      this.selectedSquare = null;
      this.legalMoves = [];
      this.hintMove = null;
      return;
    }

    // Switch selection if clicked another friendly piece
    if (piece && pieceSide === this.game.turn) {
      this.selectedSquare = { r, c };
      this.legalMoves = this.game.getLegalMovesForPiece(r, c);
      this.hintMove = null;
      sound.playSelect();
      this.render();
      return;
    }

    // Deselect
    this.selectedSquare = null;
    this.legalMoves = [];
    sound.playSelect();
    this.render();
  }

  executeMove(move) {
    const isCapture = Boolean(move.captured);
    const movingPiece = this.game.getPiece(move.from.r, move.from.c);

    // Animate arm and piece flight
    this.boardView.animateMove({
      from: move.from,
      to: move.to,
      piece: movingPiece,
      isAI: false,
      isCapture,
      capturedPiece: move.captured,
      onComplete: () => {
        const success = this.game.makeMove(move);
        if (!success) return;

        if (isCapture) {
          sound.playPieceCapture(movingPiece);
        } else {
          sound.playMove();
        }

        // Check alert sound & voice callout
        if (this.game.isCheck(this.game.turn)) {
          setTimeout(() => sound.playCheck(), 140);
        }

        this.render();

        if (this.game.isGameOver) {
          this.stopClock();
          this.handleGameOver();
          return;
        }

        if (this.gameMode === 'vs-ai' && this.game.turn !== this.playerSide) {
          this.triggerAiTurn();
        }
      }
    });
  }

  /**
   * AI PACING ORCHESTRATOR
   * Bot dừng lại suy nghĩ, highlight ô chọn 200-300ms, dùng tay áo nhấc và lướt cờ 680ms
   * Tổng thời gian quan sát: 1.5s - 2.0s, người chơi không bị ngợp!
   */
  async triggerAiTurn() {
    this.isAiThinking = true;
    this.ai.cancelled = false;
    this.menuController.updateStatus(this.game, true);

    try {
      // 1. AI tính toán nước cờ (đáp ứng nhanh trong vòng 0.6s - 1.8s)
      const bestMove = await this.ai.getBestMove(this.game);
      if (this.ai.cancelled) return;

      if (bestMove && !this.game.isGameOver) {
        // 2. Highlight quân cờ Bot chuẩn bị đi trong 120ms
        this.boardView.selectedSquare = { r: bestMove.from.r, c: bestMove.from.c };
        this.boardView.renderHighlights();
        await new Promise(r => setTimeout(r, 120));
        if (this.ai.cancelled) return;

        const movingPiece = this.game.getPiece(bestMove.from.r, bestMove.from.c);
        const isCapture = Boolean(bestMove.captured);

        // 3. Bot nhấc quân cờ và di chuyển
        await new Promise(resolve => {
          this.boardView.animateMove({
            from: bestMove.from,
            to: bestMove.to,
            piece: movingPiece,
            isAI: true,
            isCapture,
            capturedPiece: bestMove.captured,
            onComplete: () => {
              if (this.ai.cancelled) {
                resolve();
                return;
              }
              this.game.makeMove(bestMove);
              this.boardView.selectedSquare = null;

              if (isCapture) {
                sound.playPieceCapture(movingPiece);
              } else {
                sound.playMove();
              }

              if (this.game.isCheck(this.game.turn)) {
                setTimeout(() => sound.playCheck(), 140);
              }

              resolve();
            }
          });
        });
      }
    } catch (err) {
      console.error('AI error:', err);
    } finally {
      this.isAiThinking = false;
      this.render();

      if (this.game.isGameOver) {
        this.stopClock();
        this.handleGameOver();
      }
    }
  }

  handleGameOver() {
    const isHumanWin = (this.game.winner === this.playerSide);
    if (this.gameMode === 'vs-ai') {
      if (isHumanWin) {
        sound.playVictory();
      } else {
        sound.playDefeat();
      }
    } else {
      sound.playVictory();
    }

    this.menuController.showGameOverModal(
      this.game.winner,
      this.game.winReason,
      () => this.resetGame()
    );
  }

  handleBack() {
    // 1. Đang chọn quân cờ: Hủy chọn ngay lập tức
    if (this.selectedSquare) {
      this.selectedSquare = null;
      this.legalMoves = [];
      this.hintMove = null;
      sound.playSelect();
      this.render();
      return;
    }

    // 2. Nếu đang ở thanh menu bên phải: Quay lại bàn cờ
    if (this.inputController.area === 'sidebar') {
      this.inputController.setArea('board');
      return;
    }

    // 3. Nếu vừa bấm nhầm đi quân (hoặc trong ván đã có nước đi): Bấm BACK LÀ HOÃN CỜ (UNDO) NGAY!
    if (this.isAiThinking || this.game.history.length > 0) {
      this.undoMove();
      return;
    }

    // 4. Nếu chưa đi nước nào: Chuyển sang menu sidebar
    this.inputController.setArea('sidebar');
  }

  handleColorKey(color) {
    switch (color) {
      case 'red': // Undo
        this.undoMove();
        break;
      case 'green': // Hint
        this.requestHint();
        break;
      case 'yellow': // New Game
        this.confirmNewGame();
        break;
      case 'blue': // Toggle Labels
        this.toggleLabels();
        break;
      case 'menu':
        this.inputController.setArea('sidebar');
        break;
    }
  }

  undoMove() {
    // Nếu AI đang suy nghĩ khi người chơi lỡ bấm nhầm: Hủy ngay lập tức!
    if (this.isAiThinking) {
      this.ai.cancelled = true;
      this.isAiThinking = false;
      this.game.undo(); // Hủy nước người chơi vừa lỡ bấm nhầm
      this.selectedSquare = null;
      this.legalMoves = [];
      this.hintMove = null;
      sound.playSelect();
      this.render();
      this.menuController.showToast('↩️ Đã hủy nước đi nhầm (Đi lại)');
      return;
    }

    if (this.gameMode === 'vs-ai') {
      if (this.game.history.length >= 2) {
        this.game.undo();
        this.game.undo();
      } else if (this.game.history.length === 1) {
        this.game.undo();
      } else {
        sound.playError();
        return;
      }
    } else {
      if (!this.game.undo()) {
        sound.playError();
        return;
      }
    }

    this.selectedSquare = null;
    this.legalMoves = [];
    this.hintMove = null;
    sound.playSelect();
    this.render();
    this.menuController.showToast('↩️ Đã đi lại nước cờ (Undo)');
  }

  async requestHint() {
    if (!this.isHumanTurn()) return;

    const hint = await this.ai.getBestMove(this.game);
    if (hint) {
      this.selectedSquare = { r: hint.from.r, c: hint.from.c };
      this.legalMoves = [hint];
      this.hintMove = hint;
      sound.playSelect();
      this.render();
    }
  }

  resetClocks(timeLimit = this.timeLimit) {
    this.timeLimit = timeLimit;
    this.redTime = timeLimit;
    this.blackTime = timeLimit;
    this.menuController.updateClocks(this.redTime, this.blackTime, this.game.turn, this.timeLimit);
  }

  startClock() {
    this.stopClock();
    if (this.timeLimit === 0) {
      this.menuController.updateClocks(0, 0, this.game.turn, 0);
      return;
    }

    this.clockInterval = setInterval(() => {
      if (this.game.isGameOver) return;
      if (this.homeScreen && this.homeScreen.isVisible) return;
      if (this.timeLimit === 0) return;

      if (this.game.turn === SIDES.RED) {
        this.redTime = Math.max(0, this.redTime - 1);
        if (this.redTime <= 10 && this.redTime > 0) {
          sound.playClockTick();
        }
        if (this.redTime === 0) {
          this.handleTimeOut(SIDES.RED);
        }
      } else {
        this.blackTime = Math.max(0, this.blackTime - 1);
        if (this.blackTime <= 10 && this.blackTime > 0) {
          sound.playClockTick();
        }
        if (this.blackTime === 0) {
          this.handleTimeOut(SIDES.BLACK);
        }
      }

      this.menuController.updateClocks(this.redTime, this.blackTime, this.game.turn, this.timeLimit);
    }, 1000);
  }

  stopClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  handleTimeOut(loserSide) {
    this.stopClock();
    sound.playTimeOut();
    this.game.endGameByTimeout(loserSide);
    this.handleGameOver();
  }

  toggleTimeLimit() {
    const options = [0, 180, 300, 600, 900];
    const labels = {
      0: 'Thời gian: Vô hạn',
      180: 'Thời gian: 3 phút (Chớp)',
      300: 'Thời gian: 5 phút (Nhanh)',
      600: 'Thời gian: 10 phút',
      900: 'Thời gian: 15 phút'
    };
    const nextIdx = (options.indexOf(this.timeLimit) + 1) % options.length;
    this.timeLimit = options[nextIdx];
    const textLimit = document.getElementById('text-time-limit');
    if (textLimit) textLimit.textContent = labels[this.timeLimit];
    this.resetClocks(this.timeLimit);
    this.startClock();
    sound.playSelect();
  }

  resetGame() {
    this.game.reset();
    this.selectedSquare = null;
    this.legalMoves = [];
    this.hintMove = null;
    this.isAiThinking = false;
    sound.playSelect();

    this.resetClocks(this.timeLimit);
    this.startClock();

    const kingPos = this.game.findKing(this.playerSide);
    if (kingPos) {
      this.inputController.setCursor(kingPos.r, kingPos.c);
    }

    this.render();

    if (this.gameMode === 'vs-ai' && this.playerSide === SIDES.BLACK) {
      setTimeout(() => this.triggerAiTurn(), 400);
    }
  }

  confirmNewGame() {
    this.resetGame();
  }

  toggleGameMode() {
    this.gameMode = (this.gameMode === 'vs-ai') ? '2-player' : 'vs-ai';
    const textMode = document.getElementById('text-mode');
    if (textMode) {
      textMode.textContent = (this.gameMode === 'vs-ai')
        ? 'Chế độ: Đấu với Máy'
        : 'Chế độ: 2 Người chơi';
    }
    this.resetGame();
  }

  toggleDifficulty() {
    const levels = ['easy', 'medium', 'hard', 'master'];
    const names = { easy: 'Dễ (Tập sự)', medium: 'Trung bình (Kỳ thủ)', hard: 'Khó (Cao thủ)', master: 'Thần cơ 👑' };
    const nextIdx = (levels.indexOf(this.difficulty) + 1) % levels.length;
    this.difficulty = levels[nextIdx];
    this.ai.setDifficulty(this.difficulty);

    const textDiff = document.getElementById('text-difficulty');
    if (textDiff) {
      textDiff.textContent = `Độ khó: ${names[this.difficulty]}`;
    }
  }

  togglePlayerSide() {
    this.playerSide = (this.playerSide === SIDES.RED) ? SIDES.BLACK : SIDES.RED;
    const textSide = document.getElementById('text-player-side');
    if (textSide) {
      textSide.textContent = (this.playerSide === SIDES.RED)
        ? 'Phe bạn: Đỏ (Đi trước)'
        : 'Phe bạn: Đen (Đi sau)';
    }
    this.resetGame();
  }

  toggleLabels() {
    this.showLabels = this.boardView.toggleVietnameseLabels();
    const textLabels = document.getElementById('text-labels');
    if (textLabels) {
      textLabels.textContent = `Mặt cờ: ${this.showLabels ? 'Quốc ngữ' : 'Chữ Hán'}`;
    }
    this.render();
  }

  render() {
    const evalScore = this.ai.getEvaluationScore(this.game);

    this.boardView.render(this.game, {
      selectedSquare: this.selectedSquare,
      legalMoves: this.legalMoves,
      lastMove: this.game.getLastMove(),
      evalScore
    });

    this.menuController.updateStatus(this.game, this.isAiThinking);
  }
}

// Start application safely on DOM Ready or immediately if DOM is already ready
function startXiangqiApp() {
  if (typeof window !== 'undefined' && window.tvLog) {
    window.tvLog('startXiangqiApp() called, readyState=' + document.readyState);
  }
  if (!window.xiangqiApp) {
    try {
      window.tvLog && window.tvLog('Instantiating XiangqiTVApp...');
      window.xiangqiApp = new XiangqiTVApp();
      window.app = window.xiangqiApp;
      if (typeof window !== 'undefined' && window.tvLog) {
        window.tvLog('XiangqiTVApp initialized successfully!');
      }
      console.log('XiangqiTVApp initialized successfully');
    } catch (err) {
      if (typeof window !== 'undefined' && window.tvLog) {
        window.tvLog('XiangqiTVApp init ERROR: ' + (err.stack || err.message || err));
      }
      console.error('Failed to init XiangqiTVApp:', err);
      const errBox = document.createElement('div');
      errBox.style = 'position:fixed;top:20px;left:20px;right:20px;background:#991b1b;color:#fff;padding:20px;border-radius:12px;font-size:20px;z-index:99999;font-family:sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.8);';
      errBox.innerHTML = `<h3>Lỗi khởi động cờ tướng:</h3><pre style="white-space:pre-wrap;font-size:16px;">${err.stack || err.message || err}</pre>`;
      document.body.appendChild(errBox);
    }
  }
}

if (typeof window !== 'undefined' && window.tvLog) {
  window.tvLog('index.js script evaluated');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startXiangqiApp);
} else {
  startXiangqiApp();
}

