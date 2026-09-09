/**
 * CINEMATIC TV HOME SCREEN (MÀN HÌNH CHÍNH SMART TV)
 * Features:
 * - 10-foot TV visual cards with glowing golden focus rings
 * - Smooth D-pad horizontal navigation & mouse hover/click
 * - Game mode selector: Đấu với Máy, 2 Người chơi, Cờ thế kinh điển, Cài đặt
 * - Bot configuration dialog: Chọn cấp độ (Tập sự, Kỳ thủ, Cao thủ, Thần cơ) & Phe cờ
 * - Classical endgame puzzles picker
 */

import { sound } from '../audio/sound.js';
import { CLASSIC_PUZZLES } from '../engine/openings.js';

export class HomeScreen {
  constructor(container, options = {}) {
    this.container = container;
    this.onStartVsAi = options.onStartVsAi || (() => {});
    this.onStartTwoPlayer = options.onStartTwoPlayer || (() => {});
    this.onStartPuzzle = options.onStartPuzzle || (() => {});

    this.focusedCardIndex = 0;
    this.cards = [];
    this.isVisible = true;

    this.render();
  }

  show() {
    this.isVisible = true;
    this.container.style.display = 'flex';
    this.updateCardFocus(this.focusedCardIndex);
  }

  hide() {
    this.isVisible = false;
    this.container.style.display = 'none';
  }

  render() {
    this.container.innerHTML = `
      <div class="home-screen-layout">
        <!-- Ambient Glowing Mist Background -->
        <div class="home-ambient-glow"></div>

        <!-- Majestic TV Header -->
        <header class="home-header">
          <div class="home-badge">SMART TV EDITION • CHUẨN 10-FOOT UI</div>
          <h1 class="home-title">KỲ THỦ ĐẠI CHIẾN</h1>
          <div class="home-subtitle">CỜ TƯỚNG HOÀNG GIA • ĐỈNH CAO TRÍ TUỆ PHÒNG KHÁCH</div>
        </header>

        <!-- Main TV Game Mode Cards -->
        <div class="home-cards-track" id="home-cards-track">
          <!-- Card 1: Đấu Với Máy -->
          <div class="tv-card glass-panel tv-focused" data-action="ai-mode" tabindex="0">
            <div class="card-icon-emblem ai-emblem">🤖</div>
            <div class="card-content">
              <span class="card-badge">TRÍ TUỆ NHÂN TẠO</span>
              <h2 class="card-title">Đấu Với Máy</h2>
              <p class="card-desc">Đối đầu cùng AI cao thủ tích hợp sách khai cuộc kinh điển và 4 cấp độ tư duy.</p>
              <div class="card-tags">
                <span class="tag">Tập sự</span>
                <span class="tag">Kỳ thủ</span>
                <span class="tag">Cao thủ</span>
                <span class="tag highlight">Thần cơ</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ CHƠI</span>
            </div>
          </div>

          <!-- Card 2: Hai Người Chơi -->
          <div class="tv-card glass-panel" data-action="two-player" tabindex="0">
            <div class="card-icon-emblem pvp-emblem">⚔️</div>
            <div class="card-content">
              <span class="card-badge">ĐỐI KHÁNG TRỰC TIẾP</span>
              <h2 class="card-title">Hai Người Chơi</h2>
              <p class="card-desc">Giao lưu so tài cờ tướng cùng bạn bè và gia đình trên cùng màn hình TV.</p>
              <div class="card-tags">
                <span class="tag">Pass & Play</span>
                <span class="tag">Đồng hồ ván</span>
                <span class="tag">Phòng khách</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ CHƠI</span>
            </div>
          </div>

          <!-- Card 3: Cờ Thế Giang Hồ -->
          <div class="tv-card glass-panel" data-action="puzzles" tabindex="0">
            <div class="card-icon-emblem puzzle-emblem">📜</div>
            <div class="card-content">
              <span class="card-badge">THỬ THÁCH TRÍ TUỆ</span>
              <h2 class="card-title">Cờ Thế Kinh Điển</h2>
              <p class="card-desc">Luyện nghệ thuật sát chiêu qua các tuyệt phẩm cờ tàn giang hồ lừng danh.</p>
              <div class="card-tags">
                <span class="tag">Đơn Mã Ẩm Tuyền</span>
                <span class="tag">Khổng Minh</span>
                <span class="tag">Thất Tinh</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ GIẢI ĐỐ</span>
            </div>
          </div>

          <!-- Card 4: Hướng Dẫn & Cài Đặt -->
          <div class="tv-card glass-panel" data-action="settings" tabindex="0">
            <div class="card-icon-emblem setting-emblem">⚙️</div>
            <div class="card-content">
              <span class="card-badge">TÙY CHỈNH TRẢI NGHIỆM</span>
              <h2 class="card-title">Cài Đặt & Hướng Dẫn</h2>
              <p class="card-desc">Sơ đồ phím điều khiển Remote TV, âm thanh gỗ đa tầng và nhãn chữ Quốc ngữ.</p>
              <div class="card-tags">
                <span class="tag">Remote D-Pad</span>
                <span class="tag">Âm thanh gỗ</span>
                <span class="tag">Giọng nói</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">XEM CHI TIẾT</span>
            </div>
          </div>
        </div>

        <!-- TV Bottom Navigation Legend -->
        <footer class="home-bottom-legend glass-panel">
          <div class="legend-pill"><span class="pill-key">◀ ▶</span> Chọn chế độ</div>
          <div class="legend-sep">•</div>
          <div class="legend-pill"><span class="pill-key ok">OK / Enter</span> Bắt đầu</div>
          <div class="legend-sep">•</div>
          <div class="legend-pill"><span class="pill-key">Chuột</span> Bấm trực tiếp</div>
          <div class="legend-sep">•</div>
          <button id="btn-fullscreen-home" class="tv-btn tv-btn-primary" style="padding: 6px 18px; font-size: 15px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <span class="btn-icon">⛶</span>
            <span class="btn-text">Toàn Màn Hình</span>
          </button>
        </footer>

        <!-- Sub-Modal Overlay (Config AI or Puzzles) -->
        <div class="home-submodal-root" id="home-submodal-root" style="display: none;"></div>
      </div>
    `;

    this.setupInteractions();
  }

  setupInteractions() {
    this.cards = Array.from(this.container.querySelectorAll('.tv-card'));

    this.cards.forEach((card, idx) => {
      // Hover syncs focus
      card.addEventListener('mouseenter', () => {
        this.updateCardFocus(idx);
      });

      // Click triggers action
      card.addEventListener('click', () => {
        sound.playSelect();
        this.handleCardAction(card.dataset.action);
      });
    });

    const fsBtn = this.container.querySelector('#btn-fullscreen-home');
    if (fsBtn) {
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playSelect();
        this.toggleFullscreen();
      });
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

  updateCardFocus(idx) {
    this.focusedCardIndex = Math.max(0, Math.min(this.cards.length - 1, idx));
    this.cards.forEach((c, i) => {
      if (i === this.focusedCardIndex) {
        c.classList.add('tv-focused');
      } else {
        c.classList.remove('tv-focused');
      }
    });
  }

  handleKeyDown(e) {
    if (!this.isVisible) return false;

    // If a submodal (e.g. AI setup / puzzle list) is open
    const submodal = this.container.querySelector('#home-submodal-root');
    if (submodal && submodal.style.display !== 'none') {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        sound.playSelect();
        submodal.style.display = 'none';
        return true;
      }
      return false;
    }

    if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      sound.playNavigate();
      this.updateCardFocus(this.focusedCardIndex + 1);
      return true;
    }

    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      sound.playNavigate();
      this.updateCardFocus(this.focusedCardIndex - 1);
      return true;
    }

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Select') {
      e.preventDefault();
      sound.playSelect();
      const currentCard = this.cards[this.focusedCardIndex];
      if (currentCard) {
        this.handleCardAction(currentCard.dataset.action);
      }
      return true;
    }

    return false;
  }

  handleCardAction(action) {
    switch (action) {
      case 'ai-mode':
        this.showAiSetupDialog();
        break;
      case 'two-player':
        this.hide();
        this.onStartTwoPlayer();
        break;
      case 'puzzles':
        this.showPuzzleDialog();
        break;
      case 'settings':
        this.showSettingsHelpDialog();
        break;
    }
  }

  /**
   * Popup to configure Bot Difficulty & Player Side before entering game
   */
  showAiSetupDialog() {
    const submodal = this.container.querySelector('#home-submodal-root');
    if (!submodal) return;

    submodal.innerHTML = `
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel">
          <h2 class="h-modal-title">CẤU HÌNH ĐẤU VỚI MÁY (AI)</h2>
          <p class="h-modal-desc">Tùy chọn độ thông minh của Bot và phe xuất trận của bạn</p>

          <!-- Difficulty Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Cấp độ AI:</span>
            <div class="h-pill-selector" id="ai-diff-selector">
              <button class="h-pill-btn" data-val="easy">Tập sự</button>
              <button class="h-pill-btn active" data-val="medium">Kỳ thủ</button>
              <button class="h-pill-btn" data-val="hard">Cao thủ</button>
              <button class="h-pill-btn highlight-gold" data-val="master">Thần cơ 👑</button>
            </div>
          </div>

          <!-- Side Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Phe của bạn:</span>
            <div class="h-pill-selector" id="ai-side-selector">
              <button class="h-pill-btn active" data-val="r">🔴 Bên Đỏ (Đi trước)</button>
              <button class="h-pill-btn" data-val="b">⚫ Bên Đen (Đi sau)</button>
            </div>
          </div>

          <!-- Time Limit Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Giới hạn thời gian:</span>
            <div class="h-pill-selector" id="ai-time-selector">
              <button class="h-pill-btn" data-val="0">Vô hạn</button>
              <button class="h-pill-btn" data-val="180">3 phút</button>
              <button class="h-pill-btn" data-val="300">5 phút</button>
              <button class="h-pill-btn active" data-val="600">10 phút</button>
              <button class="h-pill-btn" data-val="900">15 phút</button>
            </div>
          </div>

          <!-- Actions -->
          <div class="h-modal-actions">
            <button class="tv-btn tv-btn-primary" id="btn-start-ai">
              <span class="btn-icon">⚔️</span>
              <span class="btn-text">Vào Trận Ngay</span>
            </button>
            <button class="tv-btn" id="btn-cancel-ai">
              <span class="btn-text">Quay lại</span>
            </button>
          </div>
        </div>
      </div>
    `;

    submodal.style.display = 'flex';

    // Difficulty pill toggle
    let chosenDifficulty = 'medium';
    let chosenSide = 'r';
    let chosenTimeLimit = 600; // 10 minutes default

    submodal.querySelectorAll('#ai-diff-selector .h-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playSelect();
        submodal.querySelectorAll('#ai-diff-selector .h-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chosenDifficulty = btn.dataset.val;
      });
    });

    // Side pill toggle
    submodal.querySelectorAll('#ai-side-selector .h-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playSelect();
        submodal.querySelectorAll('#ai-side-selector .h-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chosenSide = btn.dataset.val;
      });
    });

    // Time limit pill toggle
    submodal.querySelectorAll('#ai-time-selector .h-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playSelect();
        submodal.querySelectorAll('#ai-time-selector .h-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chosenTimeLimit = parseInt(btn.dataset.val, 10);
      });
    });

    submodal.querySelector('#btn-start-ai').addEventListener('click', () => {
      sound.playMove();
      submodal.style.display = 'none';
      this.hide();
      this.onStartVsAi(chosenDifficulty, chosenSide, chosenTimeLimit);
    });

    submodal.querySelector('#btn-cancel-ai').addEventListener('click', () => {
      sound.playSelect();
      submodal.style.display = 'none';
    });
  }

  /**
   * Popup to choose classical puzzles
   */
  showPuzzleDialog() {
    const submodal = this.container.querySelector('#home-submodal-root');
    if (!submodal) return;

    submodal.innerHTML = `
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel puzzle-modal">
          <h2 class="h-modal-title">CỜ THẾ KINH ĐIỂN</h2>
          <p class="h-modal-desc">Chọn một thế cờ để thử sức và rèn luyện sát chiêu</p>

          <div class="puzzle-list-items">
            ${CLASSIC_PUZZLES.map(p => `
              <div class="puzzle-item glass-panel" data-id="${p.id}">
                <div class="p-header">
                  <span class="p-title">${p.title}</span>
                  <span class="p-diff">${p.difficulty}</span>
                </div>
                <p class="p-desc">${p.description}</p>
                <div class="p-hint">💡 Gợi ý: ${p.solutionHint}</div>
              </div>
            `).join('')}
          </div>

          <div class="h-modal-actions">
            <button class="tv-btn" id="btn-close-puzzle">
              <span class="btn-text">Đóng</span>
            </button>
          </div>
        </div>
      </div>
    `;

    submodal.style.display = 'flex';

    submodal.querySelectorAll('.puzzle-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const puzzle = CLASSIC_PUZZLES.find(p => p.id === id);
        if (puzzle) {
          sound.playMove();
          submodal.style.display = 'none';
          this.hide();
          this.onStartPuzzle(puzzle);
        }
      });
    });

    submodal.querySelector('#btn-close-puzzle').addEventListener('click', () => {
      sound.playSelect();
      submodal.style.display = 'none';
    });
  }

  /**
   * Popup for Settings & TV Remote guide
   */
  showSettingsHelpDialog() {
    const submodal = this.container.querySelector('#home-submodal-root');
    if (!submodal) return;

    submodal.innerHTML = `
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel help-modal">
          <h2 class="h-modal-title">HƯỚNG DẪN ĐIỀU KHIỂN & TÍNH NĂNG</h2>

          <div class="help-grid">
            <div class="help-section">
              <h3>🎮 Điều khiển bằng Remote TV</h3>
              <p>• <b>▲ ▼ ◀ ▶</b>: Di chuyển khung ngắm mạ vàng qua 90 giao điểm.</p>
              <p>• <b>OK / Enter</b>: Chọn quân cờ / Đặt cờ vào ô chấm xanh.</p>
              <p>• <b>Back / Esc</b>: Hủy chọn / Mở bảng Menu bên phải.</p>
              <p>• <b>🔴 Phím Đỏ [1]</b>: Đi lại một nước (Undo).</p>
              <p>• <b>🟢 Phím Xanh [2]</b>: Gợi ý nước cờ tối ưu (AI Hint).</p>
              <p>• <b>🟡 Phím Vàng [3]</b>: Bắt đầu ván mới.</p>
              <p>• <b>🔵 Phím Lam [4]</b>: Bật / Tắt nhãn chữ Quốc ngữ.</p>
            </div>

            <div class="help-section">
              <h3>✨ Cảm giác chơi chân thực</h3>
              <p>• <b>Âm thanh gỗ đa tầng</b>: Tiếng "độp" ăn quân có sub-bass như gõ bàn lim thật.</p>
              <p>• <b>Rung chấn màn hình</b>: Bàn cờ nảy nhẹ khi ăn quân hoặc chiếu tướng.</p>
              <p>• <b>Giọng nói Việt</b>: Tự động hô "Chiếu tướng!" và "Chiến thắng!".</p>
              <p>• <b>Thanh Eval Bar</b>: Đo ưu thế thế trận theo thời gian thực.</p>
            </div>
          </div>

          <div class="h-modal-actions">
            <button class="tv-btn tv-btn-primary" id="btn-close-help">
              <span class="btn-text">Đã Hiểu</span>
            </button>
          </div>
        </div>
      </div>
    `;

    submodal.style.display = 'flex';

    submodal.querySelector('#btn-close-help').addEventListener('click', () => {
      sound.playSelect();
      submodal.style.display = 'none';
    });
  }
}
