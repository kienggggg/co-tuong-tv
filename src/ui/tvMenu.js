/**
 * TV MENU & 10-FOOT HUD CONTROLLER
 * Manages TV Sidebar, Status Indicators, Modals, Audio Settings,
 * and On-Screen Virtual Remote for desktop testing.
 */

import { sound } from '../audio/sound.js';

export class TVMenuController {
  constructor(app, options = {}) {
    this.app = app;
    this.sidebarContainer = options.sidebarContainer;
    this.statusContainer = options.statusContainer;
    this.modalContainer = options.modalContainer;
    this.bottomBarContainer = options.bottomBarContainer;

    this.showVirtualRemote = false;
    this.initHUD();
  }

  initHUD() {
    this.renderSidebar();
    this.renderBottomLegend();
    this.setupVirtualRemote();
  }

  renderSidebar() {
    if (!this.sidebarContainer) return;

    this.sidebarContainer.innerHTML = `
      <div class="tv-panel glass-panel" id="tv-sidebar-panel">
        <div class="panel-header">
          <div class="app-title-group">
            <h1 class="app-title">CỜ TƯỚNG TV</h1>
            <span class="app-badge">SMART TV</span>
          </div>
          <button class="header-fs-btn tv-btn-action" data-action="fullscreen" id="btn-header-fs" title="Toàn màn hình TV">⛶</button>
        </div>

        <!-- Current Match Status & Chess Clock -->
        <div class="match-status-card" id="match-status-card">
          <!-- Dual Digital LED Chess Clocks -->
          <div class="chess-clocks-wrapper" id="chess-clocks-wrapper" title="Đồng hồ thi đấu">
            <!-- Red Clock -->
            <div class="clock-display-card clock-red clock-active" id="clock-card-red">
              <div class="clock-badge">
                <span class="clock-disc-mini piece-red">帥</span>
                <span class="clock-name">ĐỎ</span>
              </div>
              <div class="clock-time" id="clock-time-red">10:00</div>
            </div>

            <div class="clock-vs-pill">VS</div>

            <!-- Black Clock -->
            <div class="clock-display-card clock-black" id="clock-card-black">
              <div class="clock-badge">
                <span class="clock-disc-mini piece-black">將</span>
                <span class="clock-name">ĐEN</span>
              </div>
              <div class="clock-time" id="clock-time-black">10:00</div>
            </div>
          </div>

          <div class="turn-indicator" id="turn-indicator">
            <div class="turn-disc piece-red" id="turn-disc">帥</div>
            <div class="turn-info">
              <span class="turn-label">LƯỢT ĐI</span>
              <span class="turn-name" id="turn-name">BÊN ĐỎ</span>
            </div>
          </div>
          <div class="ai-status-badge" id="ai-status-badge" style="display: none;">
            <span class="spinner-dot"></span>
            <span>AI đang tính toán...</span>
          </div>
          <div class="check-alert-banner" id="check-alert-banner" style="display: none;">
            ⚠️ CHIẾU TƯỚNG!
          </div>
        </div>

        <!-- TV Navigation Menu Buttons (Spacious 7-action layout) -->
        <div class="menu-actions" id="menu-actions">
          <button class="tv-btn tv-btn-home" data-action="go-home" id="btn-go-home">
            <span class="btn-icon">🏠</span>
            <span class="btn-text">Về Trang Chủ</span>
          </button>

          <button class="tv-btn tv-btn-primary" data-action="new-game" id="btn-new-game">
            <span class="btn-color-tag yellow">3</span>
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Ván cờ mới</span>
          </button>

          <button class="tv-btn" data-action="undo" id="btn-undo">
            <span class="btn-color-tag red">1</span>
            <span class="btn-icon">↩️</span>
            <span class="btn-text">Đi lại nước</span>
          </button>

          <button class="tv-btn" data-action="hint" id="btn-hint">
            <span class="btn-color-tag green">2</span>
            <span class="btn-icon">💡</span>
            <span class="btn-text">Gợi ý nước</span>
          </button>

          <button class="tv-btn" data-action="toggle-labels" id="btn-toggle-labels">
            <span class="btn-color-tag blue">4</span>
            <span class="btn-icon">🏷️</span>
            <span class="btn-text" id="text-labels">Chữ Quốc ngữ: Bật</span>
          </button>

          <button class="tv-btn" data-action="open-settings" id="btn-open-settings">
            <span class="btn-icon">⚙️</span>
            <span class="btn-text">Cài đặt ván đấu</span>
          </button>

          <button class="tv-btn" data-action="fullscreen" id="btn-fullscreen">
            <span class="btn-icon">⛶</span>
            <span class="btn-text">Toàn màn hình</span>
          </button>
        </div>

        <!-- Recent Move History -->
        <div class="move-history-card">
          <div class="history-title">Nước cờ gần nhất</div>
          <div class="history-list" id="history-list">
            <span class="history-placeholder">Chưa có nước đi nào</span>
          </div>
        </div>
      </div>
    `;

    this.bindSidebarClicks();
  }

  renderBottomLegend() {
    if (!this.bottomBarContainer) return;

    this.bottomBarContainer.innerHTML = `
      <div class="tv-bottom-bar glass-panel">
        <div class="legend-item">
          <span class="key-badge dpad">▲ ▼ ◀ ▶</span>
          <span class="legend-text">Di chuyển con trỏ</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="key-badge ok">OK / Enter</span>
          <span class="legend-text">Chọn / Đặt cờ</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="key-badge back">Back / Esc</span>
          <span class="legend-text">Hủy chọn</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge red">Đỏ [1]</span>
          <span class="legend-text">Đi lại</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge green">Xanh [2]</span>
          <span class="legend-text">Gợi ý</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge yellow">Vàng [3]</span>
          <span class="legend-text">Ván mới</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge blue">Lam [4]</span>
          <span class="legend-text">Đổi nhãn</span>
        </div>
      </div>
    `;
  }

  setupVirtualRemote() {
    let remoteEl = document.getElementById('virtual-tv-remote');
    if (!remoteEl) {
      remoteEl = document.createElement('div');
      remoteEl.id = 'virtual-tv-remote';
      remoteEl.className = 'virtual-remote-widget';
      remoteEl.style.display = 'none';
      document.body.appendChild(remoteEl);
    }

    remoteEl.innerHTML = `
      <div class="v-remote-header">
        <span class="v-remote-title">TV REMOTE</span>
        <button class="v-remote-close" id="v-remote-close">✕</button>
      </div>

      <!-- D-Pad Directional Keys -->
      <div class="v-dpad">
        <button class="v-dpad-btn up" data-key="ArrowUp">▲</button>
        <div class="v-dpad-middle">
          <button class="v-dpad-btn left" data-key="ArrowLeft">◀</button>
          <button class="v-dpad-btn ok" data-key="Enter">OK</button>
          <button class="v-dpad-btn right" data-key="ArrowRight">▶</button>
        </div>
        <button class="v-dpad-btn down" data-key="ArrowDown">▼</button>
      </div>

      <!-- Functional Keys -->
      <div class="v-remote-actions">
        <button class="v-action-btn back" data-key="Escape">BACK</button>
        <button class="v-action-btn menu" data-key="m">MENU</button>
      </div>

      <!-- TV 4 Colored Keys -->
      <div class="v-color-buttons">
        <button class="v-color-btn red" data-key="1" title="Đi lại">🔴</button>
        <button class="v-color-btn green" data-key="2" title="Gợi ý">🟢</button>
        <button class="v-color-btn yellow" data-key="3" title="Ván mới">🟡</button>
        <button class="v-color-btn blue" data-key="4" title="Đổi nhãn">🔵</button>
      </div>
    `;

    // Bind virtual remote button clicks to dispatch native keyboard events
    remoteEl.querySelectorAll('button[data-key]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.key;
        window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      });
    });

    remoteEl.querySelector('#v-remote-close').addEventListener('click', () => {
      this.toggleVirtualRemote(false);
    });
  }

  toggleVirtualRemote(show) {
    this.showVirtualRemote = (show !== undefined) ? show : !this.showVirtualRemote;
    const el = document.getElementById('virtual-tv-remote');
    if (el) {
      el.style.display = this.showVirtualRemote ? 'flex' : 'none';
    }
    const btnText = document.querySelector('#btn-virtual-remote .btn-text');
    if (btnText) {
      btnText.textContent = this.showVirtualRemote ? 'Ẩn Remote ảo' : 'Hiện Remote ảo';
    }
  }

  bindSidebarClicks() {
    const actions = this.sidebarContainer.querySelectorAll('[data-action]');
    actions.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        this.handleAction(action);
      });
    });
  }

  handleAction(action) {
    sound.playSelect();
    switch (action) {
      case 'go-home':
        this.app.returnToHomeScreen();
        break;
      case 'new-game':
        this.app.confirmNewGame();
        break;
      case 'toggle-time-limit':
        this.app.toggleTimeLimit();
        break;
      case 'toggle-mode':
        this.app.toggleGameMode();
        break;
      case 'toggle-difficulty':
        this.app.toggleDifficulty();
        break;
      case 'toggle-side':
        this.app.togglePlayerSide();
        break;
      case 'undo':
        this.app.undoMove();
        break;
      case 'hint':
        this.app.requestHint();
        break;
      case 'toggle-labels':
        this.app.toggleLabels();
        break;
      case 'open-settings':
        this.showSettingsModal();
        break;
      case 'fullscreen':
        this.toggleFullscreen();
        break;
      case 'toggle-virtual-remote':
        this.toggleVirtualRemote();
        break;
    }
  }

  getSidebarButtons() {
    return Array.from(this.sidebarContainer.querySelectorAll('.tv-btn'));
  }

  updateSidebarFocus(index) {
    const btns = this.getSidebarButtons();
    btns.forEach((b, i) => {
      if (i === index) {
        b.classList.add('tv-focused');
        b.focus();
      } else {
        b.classList.remove('tv-focused');
      }
    });
  }

  updateStatus(game, isAiThinking = false) {
    const turnName = document.getElementById('turn-name');
    const turnDisc = document.getElementById('turn-disc');
    const aiStatus = document.getElementById('ai-status-badge');
    const checkAlert = document.getElementById('check-alert-banner');
    const historyList = document.getElementById('history-list');

    if (!turnName || !turnDisc) return;

    const isRedTurn = (game.turn === 'r');
    turnName.textContent = isRedTurn ? 'BÊN ĐỎ' : 'BÊN ĐEN';
    turnDisc.textContent = isRedTurn ? '帥' : '將';
    turnDisc.className = `turn-disc ${isRedTurn ? 'piece-red' : 'piece-black'}`;

    if (aiStatus) {
      aiStatus.style.display = isAiThinking ? 'flex' : 'none';
    }

    if (checkAlert) {
      const inCheck = game.isCheck(game.turn);
      checkAlert.style.display = inCheck ? 'block' : 'none';
      if (inCheck) {
        checkAlert.textContent = `⚠️ CHIẾU TƯỚNG! (${isRedTurn ? 'Đỏ' : 'Đen'} bị chiếu)`;
      }
    }

    // Update history list
    if (historyList) {
      const moves = game.moveLog.slice(-6); // last 6 moves
      if (moves.length === 0) {
        historyList.innerHTML = '<span class="history-placeholder">Chưa có nước đi nào</span>';
      } else {
        historyList.innerHTML = moves.map((m, idx) => {
          const num = game.moveLog.length - moves.length + idx + 1;
          return `<span class="history-badge"><span class="h-num">${num}.</span> ${m}</span>`;
        }).join('');
      }
    }
  }

  /**
   * Cập nhật thời gian đồng hồ đếm ngược LED 2 bên
   */
  updateClocks(redTime, blackTime, activeSide, timeControl) {
    const cardRed = document.getElementById('clock-card-red');
    const cardBlack = document.getElementById('clock-card-black');
    const timeRed = document.getElementById('clock-time-red');
    const timeBlack = document.getElementById('clock-time-black');
    if (!cardRed || !cardBlack || !timeRed || !timeBlack) return;

    if (!timeControl || timeControl === 'none' || timeControl === 0) {
      timeRed.textContent = '∞';
      timeBlack.textContent = '∞';
      cardRed.classList.remove('clock-active', 'clock-warning');
      cardBlack.classList.remove('clock-active', 'clock-warning');
      return;
    }

    const format = (sec) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      const mm = m < 10 ? '0' + m : '' + m;
      const ss = s < 10 ? '0' + s : '' + s;
      return `${mm}:${ss}`;
    };

    timeRed.textContent = format(redTime);
    timeBlack.textContent = format(blackTime);

    if (activeSide === 'r') {
      cardRed.classList.add('clock-active');
      cardBlack.classList.remove('clock-active');
      if (redTime <= 30) {
        cardRed.classList.add('clock-warning');
      } else {
        cardRed.classList.remove('clock-warning');
      }
      cardBlack.classList.remove('clock-warning');
    } else {
      cardBlack.classList.add('clock-active');
      cardRed.classList.remove('clock-active');
      if (blackTime <= 30) {
        cardBlack.classList.add('clock-warning');
      } else {
        cardBlack.classList.remove('clock-warning');
      }
      cardRed.classList.remove('clock-warning');
    }
  }

  toggleSound() {
    const isMuted = sound.toggleMute();
    const icon = document.getElementById('icon-sound');
    const text = document.getElementById('text-sound');
    if (icon && text) {
      icon.textContent = isMuted ? '🔇' : '🔊';
      text.textContent = isMuted ? 'Âm thanh: Tắt' : 'Âm thanh: Bật';
    }
  }

  toggleFullscreen() {
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch(() => {});
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle err:', err);
    }
  }

  showGameOverModal(winner, reason, onRestart) {
    if (!this.modalContainer) return;

    const isRedWin = (winner === 'r');
    const winnerTitle = isRedWin ? 'BÊN ĐỎ THẮNG CUỘC' : 'BÊN ĐEN THẮNG CUỘC';
    const emblem = isRedWin ? '帥' : '將';
    const colorClass = isRedWin ? 'win-red' : 'win-black';

    this.modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="tv-modal glass-panel ${colorClass}">
          <div class="modal-emblem">${emblem}</div>
          <h2 class="modal-title">${winnerTitle}</h2>
          <p class="modal-desc">${reason}</p>
          <div class="modal-actions" id="modal-actions">
            <button class="tv-btn tv-btn-primary tv-focused" id="modal-btn-restart">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">Ván mới ngay</span>
            </button>
            <button class="tv-btn" id="modal-btn-close">
              <span class="btn-icon">👀</span>
              <span class="btn-text">Xem lại bàn cờ</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    this.app.inputController.setArea('modal');

    const btnRestart = document.getElementById('modal-btn-restart');
    const btnClose = document.getElementById('modal-btn-close');

    btnRestart.addEventListener('click', () => {
      this.closeModal();
      onRestart();
    });

    btnClose.addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalContainer) {
      this.modalContainer.style.display = 'none';
      this.modalContainer.innerHTML = '';
    }
    this.app.inputController.setArea('board');
  }

  showSettingsModal() {
    if (!this.modalContainer) return;
    const diffNames = { easy: 'Dễ (Tập sự)', medium: 'Trung bình (Kỳ thủ)', hard: 'Khó (Cao thủ)', master: 'Thần cơ 👑' };
    const curDiff = diffNames[this.app.aiDifficulty] || 'Trung bình';
    const curSide = this.app.playerSide === 'r' ? 'Đỏ (Đi trước)' : 'Đen (Đi sau)';
    const curTime = (!this.app.timeControl || this.app.timeControl === 'none') ? 'Vô hạn' : `${this.app.timeControl / 60} phút`;
    const curSound = sound.isMuted ? 'Tắt' : 'Bật';

    this.modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="tv-modal glass-panel" style="width: min(90vw, 500px); padding: 26px 22px; text-align: left; gap: 12px;">
          <h2 class="modal-title" style="text-align: center; font-size: 24px; margin-bottom: 8px;">⚙️ CÀI ĐẶT VÁN ĐẤU</h2>
          
          <div style="display: flex; flex-direction: column; width: 100%;">
            <button class="tv-btn" id="m-btn-diff" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⭐</span>
              <span class="btn-text">Độ khó Bot: <strong style="color: #fbbf24;" id="m-val-diff">${curDiff}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-side" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⚖️</span>
              <span class="btn-text">Phe bạn: <strong style="color: #fbbf24;" id="m-val-side">${curSide}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-time" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⏱️</span>
              <span class="btn-text">Thời gian: <strong style="color: #fbbf24;" id="m-val-time">${curTime}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-sound" style="margin-bottom: 9px !important;">
              <span class="btn-icon" id="m-icon-sound">${sound.isMuted ? '🔇' : '🔊'}</span>
              <span class="btn-text">Âm thanh: <strong style="color: #fbbf24;" id="m-val-sound">${curSound}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-remote" style="margin-bottom: 9px !important;">
              <span class="btn-icon">📱</span>
              <span class="btn-text">Remote ảo: <strong style="color: #fbbf24;" id="m-val-remote">${this.showVirtualRemote ? 'Hiện' : 'Ẩn'}</strong></span>
            </button>
          </div>

          <div style="margin-top: 10px; width: 100%; display: flex; justify-content: center;">
            <button class="tv-btn tv-btn-primary" id="m-btn-close" style="width: 100%; justify-content: center;">
              <span class="btn-icon">✕</span>
              <span class="btn-text">Đóng Cài Đặt</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    this.app.inputController.setArea('modal');

    const diffBtn = document.getElementById('m-btn-diff');
    if (diffBtn) {
      diffBtn.addEventListener('click', () => {
        this.app.toggleDifficulty();
        const names = { easy: 'Dễ (Tập sự)', medium: 'Trung bình (Kỳ thủ)', hard: 'Khó (Cao thủ)', master: 'Thần cơ 👑' };
        document.getElementById('m-val-diff').textContent = names[this.app.aiDifficulty] || 'Trung bình';
      });
    }

    const sideBtn = document.getElementById('m-btn-side');
    if (sideBtn) {
      sideBtn.addEventListener('click', () => {
        this.app.togglePlayerSide();
        document.getElementById('m-val-side').textContent = this.app.playerSide === 'r' ? 'Đỏ (Đi trước)' : 'Đen (Đi sau)';
      });
    }

    const timeBtn = document.getElementById('m-btn-time');
    if (timeBtn) {
      timeBtn.addEventListener('click', () => {
        this.app.toggleTimeLimit();
        const t = (!this.app.timeControl || this.app.timeControl === 'none') ? 'Vô hạn' : `${this.app.timeControl / 60} phút`;
        document.getElementById('m-val-time').textContent = t;
      });
    }

    const soundBtn = document.getElementById('m-btn-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.toggleSound();
        document.getElementById('m-val-sound').textContent = sound.isMuted ? 'Tắt' : 'Bật';
        document.getElementById('m-icon-sound').textContent = sound.isMuted ? '🔇' : '🔊';
      });
    }

    const remoteBtn = document.getElementById('m-btn-remote');
    if (remoteBtn) {
      remoteBtn.addEventListener('click', () => {
        this.toggleVirtualRemote();
        document.getElementById('m-val-remote').textContent = this.showVirtualRemote ? 'Hiện' : 'Ẩn';
      });
    }

    const closeBtn = document.getElementById('m-btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }
  }

  getModalButtons() {
    if (!this.modalContainer || this.modalContainer.style.display === 'none') return [];
    return Array.from(this.modalContainer.querySelectorAll('.tv-btn'));
  }
}
