/**
 * LUXURY AUTHENTIC XIANGQI BOARD & PIECE RENDERER (SVG-UNIFIED)
 * 100% Unified SVG Coordinate System (720 x 810):
 * - Guarantees ZERO piece drift, ZERO clipping, and ZERO layout overlap.
 * - Genuine turned-wood tokens: Golden Boxwood (Red) & Antique Black Ebony with Gold/Ivory (Black).
 * - Organic wood grain filters, carved intaglio calligraphy, and physical 3D drop-shadows.
 * - Integrated Eval Bar, Captured Docks, and TV Remote Spatial Reticle.
 */

import { PIECE_NAMES, SIDES } from '../engine/xiangqi.js';
import { sound } from '../audio/sound.js';

export function setSvgHTML(el, markup) {
  if (!el) return;
  if (!markup) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return;
  }

  // Tier 1: Try native innerHTML
  try {
    el.innerHTML = markup;
    if (el.firstChild) return;
  } catch (e) {}

  // Tier 2: Clean and parse via HTML5 SVG container (works in all WebKit/Tizen/Blink)
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  try {
    const temp = document.createElement('div');
    temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + markup + '</svg>';
    const svg = temp.firstChild;
    while (svg && svg.firstChild) {
      el.appendChild(svg.firstChild);
    }
    if (el.firstChild) return;
  } catch (e) {}

  // Tier 3: DOMParser XML fallback
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${markup}</svg>`,
      'image/svg+xml'
    );
    const root = doc.documentElement;
    while (root && root.firstChild) {
      el.appendChild(document.importNode ? document.importNode(root.firstChild, true) : root.firstChild);
    }
  } catch (err) {
    console.error('SVG fallback error:', err);
  }
}

export class BoardView {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.showVietnameseLabels = options.showVietnameseLabels ?? true;
    this.onCellClick = options.onCellClick || (() => {});
    this.onCellHover = options.onCellHover || (() => {});

    this.selectedSquare = null; // { r, c }
    this.legalMoves = [];       // array of { r, c }
    this.lastMove = null;
    this.cursor = { r: 9, c: 4 };
    this.isCheck = false;
    this.checkedKing = null;

    // SVG Coordinate Space (780 x 780 - Perfect True Square 1:1)
    this.boardWidth = 780;
    this.boardHeight = 780;
    this.paddingX = 66;
    this.paddingY = 66;
    this.cellWidth = (this.boardWidth - 2 * this.paddingX) / 8;   // 648 / 8 = 81px
    this.cellHeight = (this.boardHeight - 2 * this.paddingY) / 9; // 648 / 9 = 72px
    this.pieceRadius = 34; // 68px diameter in 72x81 cell: bold, magnificent, perfectly legible from 3m

    this.initDOM();
  }

  getPointCoords(r, c) {
    const x = this.paddingX + c * this.cellWidth;
    const y = this.paddingY + r * this.cellHeight;
    return { x, y };
  }

  generateGridLinesSVG() {
    let svg = '';
    for (let r = 0; r < 10; r++) {
      const y = this.paddingY + r * this.cellHeight;
      const x1 = this.paddingX;
      const x2 = this.paddingX + 8 * this.cellWidth;
      svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`;
    }
    for (let c = 0; c < 9; c++) {
      const x = this.paddingX + c * this.cellWidth;
      if (c === 0 || c === 8) {
        svg += `<line x1="${x}" y1="${this.paddingY}" x2="${x}" y2="${this.paddingY + 9 * this.cellHeight}" />`;
      } else {
        svg += `<line x1="${x}" y1="${this.paddingY}" x2="${x}" y2="${this.paddingY + 4 * this.cellHeight}" />`;
        svg += `<line x1="${x}" y1="${this.paddingY + 5 * this.cellHeight}" x2="${x}" y2="${this.paddingY + 9 * this.cellHeight}" />`;
      }
    }
    const p0 = this.getPointCoords(0, 3);
    const p1 = this.getPointCoords(2, 5);
    const p2 = this.getPointCoords(0, 5);
    const p3 = this.getPointCoords(2, 3);
    svg += `<line x1="${p0.x}" y1="${p0.y}" x2="${p1.x}" y2="${p1.y}" />`;
    svg += `<line x1="${p2.x}" y1="${p2.y}" x2="${p3.x}" y2="${p3.y}" />`;

    const p4 = this.getPointCoords(7, 3);
    const p5 = this.getPointCoords(9, 5);
    const p6 = this.getPointCoords(7, 5);
    const p7 = this.getPointCoords(9, 3);
    svg += `<line x1="${p4.x}" y1="${p4.y}" x2="${p5.x}" y2="${p5.y}" />`;
    svg += `<line x1="${p6.x}" y1="${p6.y}" x2="${p7.x}" y2="${p7.y}" />`;
    return svg;
  }

  generateCrossMarkersSVG() {
    let svg = '';
    const points = [
      { r: 2, c: 1 }, { r: 2, c: 7 },
      { r: 7, c: 1 }, { r: 7, c: 7 },
      { r: 3, c: 0, rightOnly: true }, { r: 3, c: 2 }, { r: 3, c: 4 }, { r: 3, c: 6 }, { r: 3, c: 8, leftOnly: true },
      { r: 6, c: 0, rightOnly: true }, { r: 6, c: 2 }, { r: 6, c: 4 }, { r: 6, c: 6 }, { r: 6, c: 8, leftOnly: true }
    ];
    const d = 4.5;
    const s = 6.5;
    for (const pt of points) {
      const { x, y } = this.getPointCoords(pt.r, pt.c);
      if (!pt.rightOnly) {
        svg += `<path d="M ${x - d - s} ${y - d} L ${x - d} ${y - d} L ${x - d} ${y - d - s}" fill="none" />`;
      }
      if (!pt.leftOnly) {
        svg += `<path d="M ${x + d + s} ${y - d} L ${x + d} ${y - d} L ${x + d} ${y - d - s}" fill="none" />`;
      }
      if (!pt.rightOnly) {
        svg += `<path d="M ${x - d - s} ${y + d} L ${x - d} ${y + d} L ${x - d} ${y + d + s}" fill="none" />`;
      }
      if (!pt.leftOnly) {
        svg += `<path d="M ${x + d + s} ${y + d} L ${x + d} ${y + d} L ${x + d} ${y + d + s}" fill="none" />`;
      }
    }
    return svg;
  }

  initDOM() {
    const gridLines = this.generateGridLinesSVG();
    const crossMarkers = this.generateCrossMarkersSVG();
    this.container.innerHTML = `
      <div class="board-outer-layout" id="board-outer-layout">
        <!-- Vertical Evaluation Bar -->
        <div class="eval-bar-wrapper glass-panel" id="eval-bar-wrapper" title="Thanh đo thế trận">
          <div class="eval-bar-label black">ĐEN</div>
          <div class="eval-track">
            <div class="eval-fill" id="eval-fill" style="height: 50%;"></div>
            <div class="eval-marker"></div>
          </div>
          <div class="eval-bar-label red">ĐỎ</div>
          <div class="eval-score" id="eval-score">0.0</div>
        </div>

        <!-- Left Vertical Dock: Black Pieces Captured -->
        <div class="vertical-captured-dock black-dock glass-panel" id="dock-pieces-black" title="Khay quân Đen bị bắt"></div>

        <!-- Main Board Canvas Container -->
        <div class="board-canvas-container" id="board-canvas-container" style="width: 89vh; height: 89vh; min-width: 480px; min-height: 480px; max-width: 930px; max-height: 930px; flex-shrink: 0;">
            <svg class="board-svg" id="main-board-svg" viewBox="0 0 ${this.boardWidth} ${this.boardHeight}" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <!-- Wood Grain Textures & Filters -->
                <radialGradient id="boardWoodGrad" cx="50%" cy="45%" r="70%">
                  <stop offset="0%" stop-color="#4a2a16" />
                  <stop offset="40%" stop-color="#3b1f0e" />
                  <stop offset="80%" stop-color="#2a1407" />
                  <stop offset="100%" stop-color="#1c0b03" />
                </radialGradient>

                <!-- Gold Calligraphy Foil Gradient -->
                <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fffbeb" />
                  <stop offset="30%" stop-color="#fef08a" />
                  <stop offset="70%" stop-color="#eab308" />
                  <stop offset="100%" stop-color="#92400e" />
                </linearGradient>

                <!-- Red Piece Natural Boxwood (Gỗ hoàng dương vàng ngà) -->
                <radialGradient id="redPieceWood" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#fffef0" />
                  <stop offset="30%" stop-color="#fef3c7" />
                  <stop offset="70%" stop-color="#f59e0b" />
                  <stop offset="95%" stop-color="#b45309" />
                  <stop offset="100%" stop-color="#78350f" />
                </radialGradient>

                <!-- Black Piece Antique Ebony (Gỗ mun sừng đen tuyền ánh than) -->
                <radialGradient id="blackPieceWood" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#3f3f46" />
                  <stop offset="30%" stop-color="#27272a" />
                  <stop offset="75%" stop-color="#18181b" />
                  <stop offset="95%" stop-color="#09090b" />
                  <stop offset="100%" stop-color="#000000" />
                </radialGradient>

                <!-- Realistic Piece Drop Shadow Filter -->
                <filter id="pieceElevationShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.75" />
                </filter>
                <filter id="pieceLiftedShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000000" flood-opacity="0.85" />
                </filter>

                <!-- Board Frame Bevel Shadow -->
                <filter id="boardPlateShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="14" stdDeviation="24" flood-color="#000000" flood-opacity="0.9" />
                </filter>

                <!-- Human Hand Natural Skin Tone -->
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fff1e6" />
                  <stop offset="40%" stop-color="#f8cba6" />
                  <stop offset="85%" stop-color="#e2a37f" />
                  <stop offset="100%" stop-color="#c47e56" />
                </linearGradient>

                <!-- Imperial Crimson Silk Robe (Bên Đỏ) -->
                <linearGradient id="redSleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#b91c1c" />
                  <stop offset="35%" stop-color="#881337" />
                  <stop offset="80%" stop-color="#4c0519" />
                  <stop offset="100%" stop-color="#2a030d" />
                </linearGradient>

                <!-- Midnight Obsidian Silk Robe (Bên Đen / AI) -->
                <linearGradient id="blackSleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#334155" />
                  <stop offset="35%" stop-color="#1e293b" />
                  <stop offset="80%" stop-color="#0f172a" />
                  <stop offset="100%" stop-color="#020617" />
                </linearGradient>

                <!-- Cannon Fiery Projectile Grad -->
                <radialGradient id="fireballGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="25%" stop-color="#fef08a" />
                  <stop offset="60%" stop-color="#f97316" />
                  <stop offset="90%" stop-color="#dc2626" />
                  <stop offset="100%" stop-color="#7f1d1d" />
                </radialGradient>

                <!-- Imperial Dragon Gold Aura Grad -->
                <radialGradient id="dragonAuraGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
                  <stop offset="35%" stop-color="#fde047" stop-opacity="0.85" />
                  <stop offset="70%" stop-color="#ea580c" stop-opacity="0.5" />
                  <stop offset="100%" stop-color="#ca8a04" stop-opacity="0" />
                </radialGradient>

                <!-- Ivory Tusks Gradient for Elephant Tusk Gore -->
                <linearGradient id="ivoryTuskGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#b45309" />
                  <stop offset="25%" stop-color="#fef3c7" />
                  <stop offset="70%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#fffbeb" />
                </linearGradient>

                <!-- Steel Horse Hoof Gradient -->
                <linearGradient id="steelHoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f8fafc" />
                  <stop offset="35%" stop-color="#94a3b8" />
                  <stop offset="75%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
              </defs>

              <!-- Board Solid Hardwood Plate (Hardware-accelerated rendering) -->
              <rect x="0" y="0" width="${this.boardWidth}" height="${this.boardHeight}" rx="20" fill="url(#boardWoodGrad)" stroke="#78350f" stroke-width="3.5" />
              <rect x="10" y="10" width="${this.boardWidth - 20}" height="${this.boardHeight - 20}" rx="15" fill="none" stroke="#ca8a04" stroke-opacity="0.35" stroke-width="1.8" />

              <!-- Board Outer Inlay Gold Border -->
              <rect x="${this.paddingX - 12}" y="${this.paddingY - 12}" width="${8 * this.cellWidth + 24}" height="${9 * this.cellHeight + 24}" fill="none" stroke="#ca8a04" stroke-width="3.5" rx="6" />
              <rect x="${this.paddingX - 5}" y="${this.paddingY - 5}" width="${8 * this.cellWidth + 10}" height="${9 * this.cellHeight + 10}" fill="none" stroke="#ca8a04" stroke-width="1.2" stroke-opacity="0.7" />

              <!-- Grid Lines Layer -->
              <g id="grid-lines" stroke="#ca8a04" stroke-width="1.8" stroke-opacity="0.85">${gridLines}</g>

              <!-- River Calligraphy (Sở Hà - Hán Giới) -->
              <g class="river-text" fill="url(#goldFoilGrad)" font-family="'Noto Serif SC', 'Songti SC', 'SimSun', serif" font-weight="900" font-size="28" letter-spacing="14">
                <text x="${this.paddingX + 1.7 * this.cellWidth}" y="${this.paddingY + 4.58 * this.cellHeight}" text-anchor="middle">楚 河</text>
                <text x="${this.paddingX + 6.3 * this.cellWidth}" y="${this.paddingY + 4.58 * this.cellHeight}" text-anchor="middle">漢 界</text>
              </g>

              <!-- River Vietnamese Subtitles -->
              <g class="river-sub" fill="#ca8a04" fill-opacity="0.55" font-family="'Be Vietnam Pro', sans-serif" font-size="11" font-weight="800" letter-spacing="3">
                <text x="${this.paddingX + 1.7 * this.cellWidth}" y="${this.paddingY + 4.88 * this.cellHeight}" text-anchor="middle">SỞ HÀ</text>
                <text x="${this.paddingX + 6.3 * this.cellWidth}" y="${this.paddingY + 4.88 * this.cellHeight}" text-anchor="middle">HÁN GIỚI</text>
              </g>

              <!-- Traditional Cross Markings -->
              <g id="cross-markers" stroke="#ca8a04" stroke-width="1.5" stroke-opacity="0.8">${crossMarkers}</g>

              <!-- Move Highlights & Markers Layer -->
              <g id="svg-highlights-layer"></g>

              <!-- Unified SVG Pieces Layer -->
              <g id="svg-pieces-layer"></g>

              <!-- Flying Elevated Piece Layer (during motion) -->
              <g id="svg-flying-piece-layer"></g>

              <!-- Real Human Arm & Hand Layer (gắp và di chuyển quân) -->
              <g id="svg-arm-layer"></g>

              <!-- Dynamic Particle & Capture FX Layer -->
              <g id="svg-fx-layer"></g>

              <!-- TV Remote Reticle (Cursor) - Pre-rendered for 0ms transform latency -->
              <g id="svg-tv-cursor" class="svg-reticle-group" transform="translate(-100, -100)">
                <path d="M -35 -24 L -35 -35 L -24 -35" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M 24 -35 L 35 -35 L 35 -24" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M -35 24 L -35 35 L -24 35" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M 24 35 L 35 35 L 35 24" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="0" cy="0" r="3" fill="#fbbf24" opacity="0.9" />
              </g>

              <!-- Grand Check Splash Calligraphy -->
              <g id="svg-check-splash" style="display: none;"></g>
            </svg>
          </div>

          <!-- Right Vertical Dock: Red Pieces Captured -->
          <div class="vertical-captured-dock red-dock glass-panel" id="dock-pieces-red" title="Khay quân Đỏ bị bắt"></div>
        </div>
    `;

    this.svgEl = this.container.querySelector('#main-board-svg');
    this.canvasContainer = this.container.querySelector('#board-canvas-container');
    this.highlightsLayer = this.container.querySelector('#svg-highlights-layer');
    this.piecesLayer = this.container.querySelector('#svg-pieces-layer');
    this.flyingPieceLayer = this.container.querySelector('#svg-flying-piece-layer');
    this.armLayer = this.container.querySelector('#svg-arm-layer');
    this.fxLayer = this.container.querySelector('#svg-fx-layer');
    this.tvCursorEl = this.container.querySelector('#svg-tv-cursor');
    this.checkSplashEl = this.container.querySelector('#svg-check-splash');
    this.isAnimating = false;

    this.setupMouseEvents();
    this.updateTVCursor(this.cursor.r, this.cursor.c);

    this.adjustBoardDimensions();
    window.addEventListener('resize', () => {
      this.adjustBoardDimensions();
    });
  }

  adjustBoardDimensions() {
    if (!this.canvasContainer) return;
    const stage = document.getElementById('main-stage');
    const availH = stage ? stage.clientHeight * 0.96 : window.innerHeight * 0.90;
    const availW = stage ? (stage.clientWidth - 310) * 0.98 : window.innerWidth * 0.62;
    const size = Math.round(Math.max(540, Math.min(880, Math.min(availH, availW))));
    this.canvasContainer.style.width = size + 'px';
    this.canvasContainer.style.height = size + 'px';
  }

  triggerScreenShake(intensity = 'medium') {
    if (!this.canvasContainer) return;
    this.canvasContainer.classList.remove('shake-light', 'shake-medium', 'shake-heavy');
    void this.canvasContainer.offsetWidth;
    this.canvasContainer.classList.add(`shake-${intensity}`);
    setTimeout(() => {
      if (this.canvasContainer) {
        this.canvasContainer.classList.remove(`shake-${intensity}`);
      }
    }, 450);
  }

  getBoardCellFromEvent(e) {
    if (!this.svgEl) return null;
    const rect = this.svgEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scaleX = this.boardWidth / rect.width;
    const scaleY = this.boardHeight / rect.height;

    const svgX = (e.clientX - rect.left) * scaleX;
    const svgY = (e.clientY - rect.top) * scaleY;

    const c = Math.round((svgX - this.paddingX) / this.cellWidth);
    const r = Math.round((svgY - this.paddingY) / this.cellHeight);

    if (r >= 0 && r <= 9 && c >= 0 && c <= 8) {
      const { x, y } = this.getPointCoords(r, c);
      const dist = Math.hypot(svgX - x, svgY - y);
      if (dist <= this.cellWidth * 0.65) {
        return { r, c };
      }
    }
    return null;
  }

  setupMouseEvents() {
    if (!this.canvasContainer) return;

    this.canvasContainer.addEventListener('mousemove', (e) => {
      const cell = this.getBoardCellFromEvent(e);
      if (cell) {
        this.onCellHover(cell.r, cell.c);
      }
    });

    this.canvasContainer.addEventListener('click', (e) => {
      if (this.isAnimating) return;
      const cell = this.getBoardCellFromEvent(e);
      if (cell) {
        this.onCellClick(cell.r, cell.c);
      }
    });

    this.canvasContainer.addEventListener('touchstart', (e) => {
      if (this.isAnimating) return;
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const cell = this.getBoardCellFromEvent(touch);
        if (cell) {
          this.onCellHover(cell.r, cell.c);
          this.onCellClick(cell.r, cell.c);
        }
      }
    }, { passive: true });
  }

  /**
   * Fast hardware-accelerated TV cursor positioning (0ms latency, zero DOM reconstruction)
   */
  updateTVCursor(r, c) {
    this.cursor = { r, c };
    if (!this.tvCursorEl) return;

    if (r < 0 || c < 0) {
      this.tvCursorEl.style.display = 'none';
      return;
    }

    const { x, y } = this.getPointCoords(r, c);
    this.tvCursorEl.setAttribute('transform', `translate(${x}, ${y})`);
    this.tvCursorEl.style.display = '';
  }

  toggleVietnameseLabels(show) {
    this.showVietnameseLabels = (show !== undefined) ? show : !this.showVietnameseLabels;
    return this.showVietnameseLabels;
  }

  updateEvalBar(score) {
    const fillEl = this.container.querySelector('#eval-fill');
    const scoreEl = this.container.querySelector('#eval-score');
    if (!fillEl || !scoreEl) return;

    const heightPercent = 50 + (score / 2);
    fillEl.style.height = `${Math.max(5, Math.min(95, heightPercent))}%`;

    const decimalScore = (score / 20).toFixed(1);
    scoreEl.textContent = (score > 0) ? `+${decimalScore}` : decimalScore;
    scoreEl.style.color = (score > 0) ? '#f87171' : ((score < 0) ? '#e2e8f0' : '#cbd5e1');
  }

  updateCapturedPieces(game) {
    const blackDock = this.container.querySelector('#dock-pieces-black');
    const redDock = this.container.querySelector('#dock-pieces-red');
    if (!blackDock || !redDock) return;

    const START_COUNTS = {
      'K': 1, 'A': 2, 'E': 2, 'H': 2, 'R': 2, 'C': 2, 'P': 5,
      'k': 1, 'a': 2, 'e': 2, 'h': 2, 'r': 2, 'c': 2, 'p': 5
    };

    const currentCounts = {};
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const piece = game.board[r][c];
        if (piece) {
          currentCounts[piece] = (currentCounts[piece] || 0) + 1;
        }
      }
    }

    const capturedBlack = [];
    const capturedRed = [];

    for (const [p, startNum] of Object.entries(START_COUNTS)) {
      const cur = currentCounts[p] || 0;
      const capturedNum = Math.max(0, startNum - cur);
      for (let i = 0; i < capturedNum; i++) {
        if (p === p.toUpperCase()) {
          capturedRed.push(p);
        } else {
          capturedBlack.push(p);
        }
      }
    }

    blackDock.innerHTML = capturedBlack.map(p => {
      const info = PIECE_NAMES[p];
      return `<span class="mini-piece piece-black" title="${info.name}">${info.hanzi}</span>`;
    }).join('');

    redDock.innerHTML = capturedRed.map(p => {
      const info = PIECE_NAMES[p];
      return `<span class="mini-piece piece-red" title="${info.name}">${info.hanzi}</span>`;
    }).join('');
  }

  render(game, options = {}) {
    const board = game.board;
    this.selectedSquare = options.selectedSquare || null;
    this.legalMoves = options.legalMoves || [];
    this.lastMove = options.lastMove || game.getLastMove();
    this.isCheck = game.isCheck(game.turn);
    this.checkedKing = this.isCheck ? game.findKing(game.turn) : null;

    if (options.evalScore !== undefined) {
      this.updateEvalBar(options.evalScore);
    }
    this.updateCapturedPieces(game);

    // Grand Check Splash Calligraphy in SVG
    if (this.checkSplashEl) {
      if (this.isCheck) {
        this.checkSplashEl.style.display = 'block';
        setSvgHTML(this.checkSplashEl, `
          <g transform="translate(${this.boardWidth / 2}, ${this.boardHeight / 2})">
            <!-- Backdrop Glow -->
            <rect x="-160" y="-55" width="320" height="110" rx="20" fill="#991b1b" fill-opacity="0.95" stroke="#fbbf24" stroke-width="3" filter="url(#pieceElevationShadow)" />
            <text x="0" y="-4" text-anchor="middle" font-family="'Noto Serif SC', serif" font-size="44" font-weight="900" fill="#fef08a">將 軍</text>
            <text x="0" y="34" text-anchor="middle" font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="3">CHIẾU TƯỚNG!</text>
          </g>
        `);
      } else {
        this.checkSplashEl.style.display = 'none';
        setSvgHTML(this.checkSplashEl, '');
      }
    }

    this.renderHighlights();
    this.renderPieces(board);
  }

  renderHighlights() {
    let svg = '';

    // 1. Last move highlights (from and to)
    if (this.lastMove) {
      const from = this.getPointCoords(this.lastMove.from.r, this.lastMove.from.c);
      const to = this.getPointCoords(this.lastMove.to.r, this.lastMove.to.c);

      svg += `
        <!-- Origin -->
        <circle cx="${from.x}" cy="${from.y}" r="${this.pieceRadius + 2}" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3" />
        <!-- Destination -->
        <circle cx="${to.x}" cy="${to.y}" r="${this.pieceRadius + 3}" fill="#f59e0b" fill-opacity="0.35" stroke="#fbbf24" stroke-width="2.5" />
      `;
    }

    // 2. Selected square halo
    if (this.selectedSquare) {
      const coord = this.getPointCoords(this.selectedSquare.r, this.selectedSquare.c);
      svg += `
        <circle cx="${coord.x}" cy="${coord.y}" r="${this.pieceRadius + 5}" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6 4" class="svg-selected-spin" />
        <circle cx="${coord.x}" cy="${coord.y}" r="${this.pieceRadius + 2}" fill="#f59e0b" fill-opacity="0.25" />
      `;
    }

    // 3. Legal move targets
    for (const move of this.legalMoves) {
      const { x, y } = this.getPointCoords(move.to.r, move.to.c);
      if (move.captured) {
        // Red capture brackets
        const s = this.pieceRadius + 4;
        const b = 10;
        svg += `
          <g transform="translate(${x}, ${y})">
            <path d="M ${-s} ${-s + b} L ${-s} ${-s} L ${-s + b} ${-s}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${s - b} ${-s} L ${s} ${-s} L ${s} ${-s + b}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${-s} ${s - b} L ${-s} ${s} L ${-s + b} ${s}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${s - b} ${s} L ${s} ${s} L ${s} ${s - b}" fill="none" stroke="#ef4444" stroke-width="3" />
            <circle cx="0" cy="0" r="${this.pieceRadius + 1}" fill="#ef4444" fill-opacity="0.2" />
          </g>
        `;
      } else {
        // Subtle amber gold target dot with outer ring
        svg += `
          <circle cx="${x}" cy="${y}" r="6" fill="#fbbf24" />
          <circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#fbbf24" stroke-width="1.6" opacity="0.75" />
        `;
      }
    }

    // 4. Check warning on King
    if (this.checkedKing) {
      const { x, y } = this.getPointCoords(this.checkedKing.r, this.checkedKing.c);
      svg += `
        <circle cx="${x}" cy="${y}" r="${this.pieceRadius + 8}" fill="#ef4444" fill-opacity="0.3" stroke="#dc2626" stroke-width="3.5" class="svg-check-pulse" />
      `;
    }

    setSvgHTML(this.highlightsLayer, svg);
  }

  /**
   * Render authentic luxury wooden pieces in pure SVG vector quality
   */
  renderPieces(board, hiddenCoord = null) {
    this.currentBoard = board;
    let svg = '';

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        // Skip piece currently held in air by animated hand
        if (hiddenCoord && hiddenCoord.r === r && hiddenCoord.c === c) continue;

        const piece = board[r][c];
        if (!piece) continue;

        const info = PIECE_NAMES[piece];
        if (!info) continue;

        const isRed = (info.side === SIDES.RED);
        const isSelected = this.selectedSquare && (this.selectedSquare.r === r && this.selectedSquare.c === c);
        const isTargeted = this.legalMoves.some(m => m.to.r === r && m.to.c === c && m.captured);

        const { x, y } = this.getPointCoords(r, c);

        // Styling parameters
        const woodGrad = isRed ? "url(#redPieceWood)" : "url(#blackPieceWood)";
        const rimColor = isRed ? "#78350f" : "#09090b";
        const innerBorder = isRed ? "#b91c1c" : "#ca8a04";
        const charColor = isRed ? "#991b1b" : "#fef08a";
        const labelColor = isRed ? "#7f1d1d" : "#fbbf24";

        // 3D Piece Elevation & Shadow when selected
        const transformScale = isSelected ? 'translate(0, -10) scale(1.24)' : (isTargeted ? 'scale(1.05)' : 'scale(1)');

        svg += `
          <g class="svg-piece-group ${isRed ? 'red' : 'black'} ${isSelected ? 'selected' : ''}"
             transform="translate(${x}, ${y}) ${transformScale}"
             style="cursor: pointer; transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);">

            <!-- 0. Zero-Overhead Hardware-Accelerated Vector Shadow -->
            <circle cx="0" cy="${isSelected ? 8 : 3}" r="${this.pieceRadius}" fill="#000000" opacity="${isSelected ? 0.45 : 0.28}" />

            <!-- 1. Turned Solid Wood Disc (Thân cờ gỗ tiện tròn vát mép) -->
            <circle cx="0" cy="0" r="${this.pieceRadius}" fill="${woodGrad}" stroke="${rimColor}" stroke-width="2.2" />

            <!-- 2. Lathe-turned Chamfer Highlight Ring (Viền vát 3D bóng) -->
            <circle cx="0" cy="0" r="${this.pieceRadius - 3.5}" fill="none" stroke="${isRed ? '#fef08a' : '#52525b'}" stroke-width="0.8" opacity="0.6" />

            <!-- 3. Recessed Circular Well (Lòng cờ khoét chìm tinh tế) -->
            <circle cx="0" cy="0" r="${this.pieceRadius - 6}" fill="${isRed ? 'rgba(254, 243, 199, 0.25)' : 'rgba(0, 0, 0, 0.4)'}" stroke="${innerBorder}" stroke-width="1.6" opacity="0.85" />

            <!-- 4. Deep Intaglio Carved Chinese Character (Khắc chìm sơn son/thếp vàng to nét chuẩn TV 3m) -->
            <text x="0" y="${this.showVietnameseLabels ? -2 : 10}"
                  text-anchor="middle"
                  font-family="'Noto Serif SC', 'Songti SC', 'SimSun', serif"
                  font-size="34"
                  font-weight="900"
                  fill="${charColor}"
                  style="text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">
              ${info.hanzi}
            </text>

            <!-- 5. Refined Micro Vietnamese Label (Nhãn Quốc ngữ in đậm sắc nét chuẩn TV 3m) -->
            ${this.showVietnameseLabels ? `
              <text x="0" y="22"
                    text-anchor="middle"
                    font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
                    font-size="12.5"
                    font-weight="900"
                    fill="${labelColor}"
                    letter-spacing="0.8">
                ${info.name.toUpperCase()}
              </text>
            ` : ''}
          </g>
        `;
      }
    }

    setSvgHTML(this.piecesLayer, svg);
  }

  /**
   * Render a single turned wooden piece SVG group
   */
  renderSinglePieceSVG(piece, x, y, scale = 1, isLifted = true) {
    if (!piece) return '';
    const info = PIECE_NAMES[piece];
    if (!info) return '';

    const isRed = (info.side === SIDES.RED);
    const woodGrad = isRed ? "url(#redPieceWood)" : "url(#blackPieceWood)";
    const rimColor = isRed ? "#78350f" : "#09090b";
    const innerBorder = isRed ? "#b91c1c" : "#ca8a04";
    const charColor = isRed ? "#991b1b" : "#fef08a";
    const labelColor = isRed ? "#7f1d1d" : "#fbbf24";

    return `
      <g class="svg-piece-group ${isRed ? 'red' : 'black'}"
         transform="translate(${x}, ${y}) scale(${scale})"
         style="cursor: pointer;">
        <!-- Vector shadow -->
        <circle cx="0" cy="${isLifted ? 8 : 3}" r="${this.pieceRadius}" fill="#000000" opacity="${isLifted ? 0.45 : 0.28}" />
        <circle cx="0" cy="0" r="${this.pieceRadius}" fill="${woodGrad}" stroke="${rimColor}" stroke-width="2.2" />
        <circle cx="0" cy="0" r="${this.pieceRadius - 3.5}" fill="none" stroke="${isRed ? '#fef08a' : '#52525b'}" stroke-width="0.8" opacity="0.6" />
        <circle cx="0" cy="0" r="${this.pieceRadius - 6}" fill="${isRed ? 'rgba(254, 243, 199, 0.25)' : 'rgba(0, 0, 0, 0.4)'}" stroke="${innerBorder}" stroke-width="1.6" opacity="0.85" />
        <text x="0" y="${this.showVietnameseLabels ? -2 : 10}"
              text-anchor="middle"
              font-family="'Noto Serif SC', 'Songti SC', 'SimSun', serif"
              font-size="34"
              font-weight="900"
              fill="${charColor}">
          ${info.hanzi}
        </text>
        ${this.showVietnameseLabels ? `
          <text x="0" y="22"
                text-anchor="middle"
                font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
                font-size="12.5"
                font-weight="900"
                fill="${labelColor}"
                letter-spacing="0.8">
            ${info.name.toUpperCase()}
          </text>
        ` : ''}
      </g>
    `;
  }

  /**
   * CÁNH TAY & BÀN TAY KỲ THỦ THƯ SINH CÓ KHUỶU TAY TỰ NHIÊN
   * (SCHOLARLY GRANDMASTER ARM WITH NATURAL ELBOW JOINT & DRAPED SILK SLEEVE)
   * Cánh tay gập khuỷu tự nhiên (bắp tay - khuỷu tay - cẳng tay - bàn tay),
   * nếp gấp gấm tại hõm khuỷu tay và vạt áo thụng buông rủ kiêu sa.
   */
  renderArmAndHandSVG({ x, y, side, isElevated = true }) {
    const isRed = (side === SIDES.RED);
    const baseX = Math.min(650, Math.max(130, x));
    const baseY = isRed ? 870 : -90;

    const dx = baseX - x;
    const dy = baseY - y;
    const dist = Math.max(140, Math.hypot(dx, dy));
    const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;

    const sleeveFill = isRed ? 'url(#redSleeveGrad)' : 'url(#blackSleeveGrad)';
    const sleeveStroke = isRed ? '#ca8a04' : '#64748b';
    const cuffInnerColor = isRed ? '#450a0a' : '#090d16';
    const goldAccent = isRed ? '#fef08a' : '#cbd5e1';

    // === KHUỶU TAY (ELBOW JOINT DYNAMICS) ===
    // Elbow position along the reach axis
    const elbowY = Math.max(95, Math.min(225, 52 + dist * 0.38));
    // Natural elbow flare outward to the right side (positive X in local rotated frame)
    const elbowX = Math.max(38, Math.min(76, 22 + dist * 0.14));
    // Shoulder anchor at board edge
    const shoulderX = Math.max(16, Math.min(42, elbowX * 0.52));
    const sleeveBaseW = Math.max(56, Math.min(96, 38 + dist * 0.12));

    return `
      <g class="svg-human-arm-group ${isRed ? 'arm-red' : 'arm-black'}"
         transform="translate(${x}, ${y}) rotate(${angleDeg - 90})"
         filter="url(#pieceLiftedShadow)">

        <!-- 1. DRAPED SILK ROBE SLEEVE WITH ARTICULATED ELBOW (Áo gấm thụng có khuỷu tay) -->
        
        <!-- Layer 1A: Outer Silhouette of Sleeve (Forearm -> Elbow -> Upper Arm -> Shoulder) -->
        <path d="M 22 62 
                 C 28 74, ${elbowX * 0.6} ${elbowY - 26}, ${elbowX + 16} ${elbowY - 8}
                 C ${elbowX + 24} ${elbowY + 4}, ${elbowX + 22} ${elbowY + 20}, ${elbowX + 12} ${elbowY + 32}
                 C ${elbowX + 2} ${elbowY + 48}, ${shoulderX + sleeveBaseW * 0.48} ${dist * 0.76}, ${shoulderX + sleeveBaseW * 0.5} ${dist}
                 L ${shoulderX - sleeveBaseW * 0.5} ${dist}
                 C ${shoulderX - sleeveBaseW * 0.72} ${dist * 0.75}, -56 ${elbowY + 36}, -48 ${elbowY}
                 C -42 ${elbowY - 28}, -32 76, -22 62
                 Z" 
              fill="${sleeveFill}" 
              stroke="${sleeveStroke}" 
              stroke-width="1.6" />

        <!-- Layer 1B: Hanging Sleeve Drape Shadow (Độ rủ bóng đổ vạt áo thụng dưới khuỷu tay) -->
        <path d="M -48 ${elbowY} 
                 C -54 ${elbowY + 45}, ${shoulderX - sleeveBaseW * 0.6} ${dist * 0.8}, ${shoulderX - sleeveBaseW * 0.4} ${dist}
                 C -25 ${dist * 0.82}, -20 ${elbowY + 60}, -15 ${elbowY + 20}
                 Z"
              fill="rgba(0,0,0,0.22)" />

        <!-- Layer 1C: Elbow Creases & Radiating Folds (Nếp gập vải tại khuỷu tay) -->
        <!-- Main inner crook crease (Nếp gấp chính tại hõm khuỷu) -->
        <path d="M -22 ${elbowY - 4} C 2 ${elbowY - 2}, ${elbowX * 0.45} ${elbowY - 6}, ${elbowX + 8} ${elbowY - 2}" 
              fill="none" stroke="rgba(0,0,0,0.42)" stroke-width="2.6" stroke-linecap="round" />
        <path d="M -20 ${elbowY - 3} C 4 ${elbowY - 1}, ${elbowX * 0.46} ${elbowY - 5}, ${elbowX + 7} ${elbowY - 1}" 
              fill="none" stroke="${goldAccent}" stroke-width="0.8" opacity="0.38" />

        <!-- Diagonal drapery fold 1 (Nếp gấp chéo xuống vạt dưới) -->
        <path d="M -16 ${elbowY + 12} C 8 ${elbowY + 20}, ${elbowX * 0.5} ${elbowY + 18}, ${elbowX + 11} ${elbowY + 22}" 
              fill="none" stroke="rgba(0,0,0,0.36)" stroke-width="2.2" stroke-linecap="round" />

        <!-- Forearm drapery fold (Nếp gấp dọc cẳng tay) -->
        <path d="M -12 70 C 6 80, 20 86, ${elbowX - 2} ${elbowY - 18}" 
              fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.8" stroke-linecap="round" />

        <!-- Upper arm fold towards shoulder (Nếp gấp bắp tay về vai) -->
        <path d="M -28 ${elbowY + 36} C 0 ${elbowY + 46}, ${elbowX * 0.4} ${elbowY + 50}, ${shoulderX + 12} ${dist * 0.8}" 
              fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="2" stroke-linecap="round" />

        <!-- Layer 1D: Elbow Outer Apex Highlight & Seam (Đường gân chỉ vàng vắt qua đầu khuỷu tay) -->
        <path d="M 22 62 
                 C 28 74, ${elbowX * 0.65} ${elbowY - 22}, ${elbowX + 16} ${elbowY - 6}
                 C ${elbowX + 22} ${elbowY + 6}, ${elbowX + 18} ${elbowY + 22}, ${elbowX + 8} ${elbowY + 32}
                 C ${elbowX} ${elbowY + 46}, ${shoulderX + sleeveBaseW * 0.42} ${dist * 0.82}, ${shoulderX + sleeveBaseW * 0.45} ${dist}" 
              fill="none" stroke="${goldAccent}" stroke-width="1.2" opacity="0.55" stroke-dasharray="5 3" />

        <!-- Outer elbow bone curve highlight (Ánh sáng phản chiếu trên đầu khuỷu tay) -->
        <path d="M ${elbowX + 10} ${elbowY - 10} 
                 C ${elbowX + 20} ${elbowY + 4}, ${elbowX + 18} ${elbowY + 18}, ${elbowX + 7} ${elbowY + 28}" 
              fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.45" />

        <!-- Layer 1E: Sleeve Opening Inner Depth (Lớp lót nhung miệng ống tay) -->
        <ellipse cx="0" cy="62" rx="26" ry="7" fill="${cuffInnerColor}" stroke="${sleeveStroke}" stroke-width="1" />

        <!-- Layer 1F: Imperial Embroidered Golden Cuff Band (Bác tay áo thếp vàng uốn lượn) -->
        <path d="M -26 64 C -12 70, 12 70, 26 64 C 24 55, 18 52, 16 51 C 8 55, -8 55, -16 51 C -18 52, -24 55, -26 64 Z" 
              fill="#ca8a04" stroke="#fef08a" stroke-width="1.2" />
        <path d="M -22 62 C -10 67, 10 67, 22 62" 
              fill="none" stroke="${goldAccent}" stroke-width="1.5" stroke-dasharray="3 2" />

        <!-- 2. FOREARM & SLENDER WRIST (Cổ tay thư sinh thon dài thanh tú) -->
        <!-- Emerges smoothly from inside the sleeve cuff -->
        <path d="M -13 58 
                 C -13 46, -11 36, -10 28 
                 C -3 26, 3 26, 10 28 
                 C 11 36, 13 46, 13 58 
                 Z" 
              fill="url(#skinGrad)" 
              stroke="#b86b40" 
              stroke-width="0.8" />

        <!-- Delicate wrist styloid contour & tendon highlight -->
        <path d="M -8 38 C -4 31, -2 26, -1 20" fill="none" stroke="#fff4eb" stroke-width="1.2" opacity="0.55" />
        <path d="M 8 36 C 5 30, 4 25, 4 20" fill="none" stroke="#c0784d" stroke-width="0.7" opacity="0.6" />

        <!-- 3. PALM DORSUM (Mu bàn tay thanh nhã, thon dài) -->
        <path d="M -10 28 
                 C -14 18, -12 8, -9 0 
                 C -4 -4, 4 -4, 9 0 
                 C 12 8, 14 18, 10 28 
                 Z" 
              fill="url(#skinGrad)" 
              stroke="#b86b40" 
              stroke-width="0.9" />

        <!-- 4. FINGERS ("SONG CHỈ KẸP CỜ" - KỲ THỦ ĐÍCH THỰC) -->

        <!-- A. Ring & Little Fingers (Ngón áp út & ngón út co nhẹ duyên dáng phía sau) -->
        <g class="hand-finger-curled">
          <!-- Ring finger -->
          <path d="M 9 14 C 16 16, 22 21, 20 27 C 18 31, 12 30, 8 24 Z" 
                fill="#deb291" stroke="#b86b40" stroke-width="0.8" />
          <!-- Little finger -->
          <path d="M 7 24 C 13 26, 17 31, 15 36 C 13 39, 9 37, 6 31 Z" 
                fill="#caa081" stroke="#b86b40" stroke-width="0.7" />
        </g>

        <!-- B. Piece Contact Shadows (Bóng đổ ngón tay lên vành gỗ quân cờ) -->
        <ellipse cx="14" cy="-22" rx="4" ry="2.5" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="21" cy="-20" rx="3.5" ry="2" fill="rgba(0,0,0,0.25)" />
        <ellipse cx="-18" cy="-1" rx="3.5" ry="4" fill="rgba(0,0,0,0.3)" />

        <!-- C. Thumb (Ngón Cái - Uốn cong tự nhiên ghì vành dưới bên trái) -->
        <g class="hand-finger-thumb">
          <!-- Thenar base & shaft -->
          <path d="M -9 18 
                   C -16 16, -24 9, -23 -1 
                   C -22 -8, -15 -8, -14 -1 
                   C -13 4, -9 10, -7 16 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Knuckle creases -->
          <path d="M -19 4 C -16 5, -14 7, -13 8" fill="none" stroke="#b46e45" stroke-width="0.8" />
          <!-- Thumb fingernail & highlight -->
          <path d="M -21 -3 C -20 -7, -16 -7, -15 -3 C -16 -1, -20 -1, -21 -3 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="-18" cy="-4" rx="1.5" ry="2.2" fill="#ffffff" opacity="0.85" />
        </g>

        <!-- D. Middle Finger (Ngón Giữa - Ngón dài nhất, đặt vững chãi trên mặt cờ) -->
        <g class="hand-finger-middle">
          <!-- 3 Phalanges contoured gracefully -->
          <path d="M 4 2 
                   C 7 -8, 12 -18, 15 -27 
                   C 19 -28, 22 -24, 20 -16 
                   C 17 -8, 12 3, 9 10 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Interphalangeal creases -->
          <line x1="8" y1="-8" x2="15" y2="-7" stroke="#b46e45" stroke-width="0.7" />
          <line x1="12" y1="-18" x2="18" y2="-17" stroke="#b46e45" stroke-width="0.7" />
          <!-- Fingernail & reflection -->
          <path d="M 16 -26 C 18 -29, 21 -27, 20 -24 C 19 -22, 16 -23, 16 -26 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="18" cy="-25" rx="1.4" ry="2" fill="#ffffff" opacity="0.9" />
        </g>

        <!-- E. Index Finger (Ngón Trỏ - Thon dài, kẹp chặt vành cờ cạnh ngón giữa) -->
        <g class="hand-finger-index">
          <path d="M -2 0 
                   C 2 -9, 7 -19, 10 -26 
                   C 14 -27, 16 -23, 14 -16 
                   C 11 -8, 6 2, 4 9 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Knuckle lines -->
          <line x1="3" y1="-9" x2="9" y2="-8" stroke="#b46e45" stroke-width="0.7" />
          <line x1="6" y1="-19" x2="12" y2="-18" stroke="#b46e45" stroke-width="0.7" />
          <!-- Fingernail & gloss -->
          <path d="M 10 -25 C 12 -28, 15 -26, 14 -23 C 13 -21, 10 -22, 10 -25 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="12" cy="-24" rx="1.3" ry="1.8" fill="#ffffff" opacity="0.9" />
        </g>

      </g>
    `;
  }

  /**
   * HIỆU ỨNG ĂN QUÂN CHUYÊN BIỆT CHO CẢ 7 QUÂN CỜ
   */
  triggerPieceCaptureFX(pieceLetter, fromPoint, toPoint, onClimax, onComplete) {
    const p = (pieceLetter || '').toUpperCase();
    if (!this.fxLayer) {
      if (onClimax) onClimax();
      if (onComplete) onComplete();
      return;
    }

    switch (p) {
      case 'C':
        this.animateCannonBlastFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'R':
        this.animateChariotChargeFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'H':
        this.animateHorseTrampleFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'E':
        this.animateElephantShatterFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'A':
        this.animateAdvisorSlashFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'K':
        this.animateKingDragonFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      case 'P':
        this.animateSoldierSpearFX(fromPoint, toPoint, onClimax, onComplete);
        break;
      default:
        this.animateGenericCaptureFX(fromPoint, toPoint, onClimax, onComplete);
    }
  }

  /**
   * 💥 1. PHÁO NỔ ĐẠI BÁC: Đạn lửa xé gió bay cầu vồng và nổ tung mảnh vỡ
   */
  animateCannonBlastFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    const startTime = performance.now();
    const flightDuration = 280;

    // Muzzle flash at origin
    setSvgHTML(fx, `
      <circle cx="${fromPoint.x}" cy="${fromPoint.y}" r="26" fill="#f59e0b" opacity="0.9" class="svg-muzzle-flash" />
      <g id="flying-cannonball"></g>
    `);

    const ballGroup = fx.querySelector('#flying-cannonball');

    const flightStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / flightDuration);

      // Parabolic flight arc
      const currX = fromPoint.x + (toPoint.x - fromPoint.x) * progress;
      const currY = fromPoint.y + (toPoint.y - fromPoint.y) * progress - Math.sin(progress * Math.PI) * 48;

      if (ballGroup) {
        setSvgHTML(ballGroup, `
          <!-- Smoke tail -->
          <circle cx="${currX - (toPoint.x - fromPoint.x) * 0.05}" cy="${currY + 5}" r="7" fill="#78350f" opacity="0.6" />
          <!-- Fiery projectile core -->
          <circle cx="${currX}" cy="${currY}" r="11" fill="url(#fireballGrad)" filter="url(#pieceLiftedShadow)" />
          <circle cx="${currX}" cy="${currY}" r="15" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.85" />
        `);
      }

      if (progress < 1) {
        requestAnimationFrame(flightStep);
      } else {
        // Explosion Detonation at Target
        if (onClimax) onClimax();

        const numParticles = 20;
        const particles = [];
        for (let i = 0; i < numParticles; i++) {
          const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.4;
          const speed = 40 + Math.random() * 55;
          const colors = ['#fef08a', '#f59e0b', '#ef4444', '#b45309', '#78350f'];
          particles.push({
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: colors[i % colors.length],
            size: 3 + Math.random() * 4.5
          });
        }

        const blastStart = performance.now();
        const blastDuration = 400;

        const blastStep = (blastNow) => {
          const bElapsed = blastNow - blastStart;
          const bProg = Math.min(1, bElapsed / blastDuration);
          const ringRadius = 10 + bProg * 75;
          const ringOpacity = Math.max(0, 1 - bProg);

          let pSvg = `
            <!-- Shockwave Fiery Blast Ring -->
            <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${ringRadius}" fill="none" stroke="#f97316" stroke-width="${Math.max(1, 6 * (1 - bProg))}" opacity="${ringOpacity}" />
            <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${ringRadius * 0.7}" fill="#ef4444" fill-opacity="${ringOpacity * 0.45}" />
          `;

          particles.forEach(p => {
            const px = toPoint.x + p.vx * bProg;
            const py = toPoint.y + p.vy * bProg + (bProg * bProg * 25); // gravity
            pSvg += `<rect x="${px}" y="${py}" width="${p.size}" height="${p.size}" rx="1" fill="${p.color}" opacity="${ringOpacity}" transform="rotate(${bProg * 360}, ${px}, ${py})" />`;
          });

          setSvgHTML(fx, pSvg);

          if (bProg < 1) {
            requestAnimationFrame(blastStep);
          } else {
            setSvgHTML(fx, '');
            if (onComplete) onComplete();
          }
        };

        requestAnimationFrame(blastStep);
      }
    };

    requestAnimationFrame(flightStep);
  }

  /**
   * ⚡ 2. XE - CHIẾN XA THIẾT KỴ: Vệt kiếm quang lao thẳng và sóng xung kích kép
   */
  animateChariotChargeFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    if (onClimax) onClimax();

    const start = performance.now();
    const duration = 380;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const opacity = 1 - p;

      setSvgHTML(fx, `
        <!-- High-speed Chariot Lightning Rush Beam -->
        <line x1="${fromPoint.x}" y1="${fromPoint.y}" x2="${toPoint.x}" y2="${toPoint.y}" stroke="#ca8a04" stroke-width="${14 * (1 - p)}" stroke-linecap="round" opacity="${opacity * 0.8}" />
        <line x1="${fromPoint.x}" y1="${fromPoint.y}" x2="${toPoint.x}" y2="${toPoint.y}" stroke="#fef08a" stroke-width="${5 * (1 - p)}" stroke-linecap="round" opacity="${opacity}" />
        <!-- Crushing Shockwave Rings -->
        <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${12 + p * 65}" fill="none" stroke="#fbbf24" stroke-width="${4 * (1 - p)}" opacity="${opacity}" />
        <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${6 + p * 45}" fill="#ca8a04" fill-opacity="${opacity * 0.35}" />
      `);

      if (p < 1) requestAnimationFrame(step);
      else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * 🐎 3. MÃ - CHIẾN MÃ ĐÁ VÓ (REARING STALLION TWIN HOOF KICK)
   * Ngựa chiến chồm lên, tung cú song cước móng sắt giáng mạnh vào quân cờ đối thủ,
   * tóe lửa móng sắt, sóng xung kích hình móng ngựa kép và tiếng ngựa hí rung trời.
   */
  animateHorseTrampleFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    const start = performance.now();
    const duration = 400;

    // Trajectory angle from attacker to target
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
    const kickAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Generate flying horseshoe sparks
    const numSparks = 14;
    const sparks = [];
    for (let i = 0; i < numSparks; i++) {
      const spkAngle = (Math.PI * 2 * i) / numSparks + (Math.random() - 0.5) * 0.5;
      const spkSpeed = 35 + Math.random() * 50;
      sparks.push({
        vx: Math.cos(spkAngle) * spkSpeed,
        vy: Math.sin(spkAngle) * spkSpeed,
        color: i % 2 === 0 ? '#fef08a' : '#f59e0b',
        size: 2.5 + Math.random() * 2.5
      });
    }

    let climaxTriggered = false;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);

      // Animation curve:
      // 0.0 - 0.35: Rearing up & recoil back (thế co vó chuẩn bị đá)
      // 0.35 - 0.55: Violent explosive kick thrust forward (tung song cước phóng tới)
      // 0.55 - 1.0: Impact follow-through, recoil and fade (thu chân và chấn động lan tỏa)
      let kickDist = 0;
      let hoofScale = 1;
      let opacity = 1;

      if (p < 0.35) {
        const prep = p / 0.35;
        kickDist = -24 * Math.sin(prep * Math.PI * 0.5); // pull back
        hoofScale = 0.9 + 0.2 * prep;
      } else if (p < 0.55) {
        const thrust = (p - 0.35) / 0.20;
        // Explosive snap forward: from -24 through 0 to +18
        kickDist = -24 + 42 * (1 - Math.pow(1 - thrust, 3));
        hoofScale = 1.1 + 0.15 * Math.sin(thrust * Math.PI);

        if (thrust >= 0.5 && !climaxTriggered) {
          climaxTriggered = true;
          if (onClimax) onClimax();
          sound.playHorseKick();
        }
      } else {
        const rest = (p - 0.55) / 0.45;
        kickDist = 18 - 14 * rest;
        hoofScale = 1.1 - 0.2 * rest;
        opacity = Math.max(0, 1 - rest * 1.3);
      }

      // Shockwave ring expansion after impact
      const shockP = Math.max(0, (p - 0.45) / 0.55);
      const shockRadius = 12 + shockP * 62;
      const shockOpacity = Math.max(0, (1 - shockP) * 0.9);

      let svg = `
        <g transform="translate(${toPoint.x}, ${toPoint.y})">
      `;

      // 1. Expanding Horseshoe Shockwave Rings
      if (shockP > 0) {
        svg += `
          <!-- Golden shockwave ripple -->
          <circle cx="0" cy="0" r="${shockRadius}" fill="none" stroke="#fbbf24" stroke-width="${Math.max(1, 4.5 * (1 - shockP))}" opacity="${shockOpacity}" />
          <circle cx="0" cy="0" r="${shockRadius * 0.7}" fill="none" stroke="#f59e0b" stroke-width="${Math.max(1, 2.5 * (1 - shockP))}" opacity="${shockOpacity * 0.7}" />

          <!-- Horseshoe Ground Crater Imprints (2 vết móng ngựa lún vào gỗ) -->
          <g transform="rotate(${kickAngle})" opacity="${shockOpacity}">
            <!-- Left Hoofprint -->
            <path d="M -18 -12 C -24 -6, -24 6, -18 12 L -14 10 C -19 5, -19 -5, -14 -10 Z" fill="#78350f" opacity="0.65" />
            <!-- Right Hoofprint -->
            <path d="M 6 -12 C 0 -6, 0 6, 6 12 L 10 10 C 5 5, 5 -5, 10 -10 Z" fill="#78350f" opacity="0.65" />
          </g>
        `;

        // 2. Flying Horseshoe Sparks
        sparks.forEach(sp => {
          const spX = sp.vx * shockP;
          const spY = sp.vy * shockP + (shockP * shockP * 18);
          svg += `<rect x="${spX}" y="${spY}" width="${sp.size}" height="${sp.size}" rx="0.8" fill="${sp.color}" opacity="${shockOpacity}" transform="rotate(${shockP * 280}, ${spX}, ${spY})" />`;
        });
      }

      // 3. The Two Warhorse Hooves Kicking along kickAngle
      if (opacity > 0) {
        svg += `
          <g transform="rotate(${kickAngle}) translate(${kickDist}, 0) scale(${hoofScale})" opacity="${opacity}">
            <!-- Battle Speed Dust Lines -->
            <line x1="-50" y1="-12" x2="-20" y2="-12" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" />
            <line x1="-50" y1="12" x2="-20" y2="12" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" />

            <!-- === LEFT HOOF (VÓ NGỰA TRÁI) === -->
            <g transform="translate(0, -13)">
              <!-- Leg Fetlock (Cổ chân ngựa cơ bắp) -->
              <path d="M -42 7 L -22 6 L -10 5 L -10 -5 L -22 -6 L -42 -7 Z" fill="#1e1b18" stroke="#ca8a04" stroke-width="0.8" />
              <!-- Golden Leg Armor Greave (Giáp chân ngựa mạ vàng) -->
              <rect x="-34" y="-5.5" width="12" height="11" rx="2" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8" />
              <!-- Fetlock feather hair (Lông cọc cổ chân) -->
              <path d="M -22 6 C -28 11, -32 10, -36 8" fill="none" stroke="#78350f" stroke-width="2" />
              <!-- Hoof Horn (Sừng móng ngựa) -->
              <path d="M -10 6 C -4 7, 6 6, 8 0 C 6 -6, -4 -7, -10 -6 Z" fill="url(#steelHoofGrad)" stroke="#09090b" stroke-width="1.2" />
              <!-- Steel Horseshoe (Móng sắt bọc ngoài sáng chói) -->
              <path d="M -4 7 C 5 7, 10 5, 10 0 C 10 -5, 5 -7, -4 -7 L -2 -5 C 5 -5, 8 -3, 8 0 C 8 3, 5 5, -2 5 Z" 
                    fill="#f8fafc" stroke="#334155" stroke-width="0.8" />
              <!-- Horseshoe Nail Studs -->
              <circle cx="2" cy="-4" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="-2" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="2" r="0.8" fill="#ca8a04" />
              <circle cx="2" cy="4" r="0.8" fill="#ca8a04" />
            </g>

            <!-- === RIGHT HOOF (VÓ NGỰA PHẢI) === -->
            <g transform="translate(0, 13)">
              <!-- Leg Fetlock -->
              <path d="M -42 7 L -22 6 L -10 5 L -10 -5 L -22 -6 L -42 -7 Z" fill="#1e1b18" stroke="#ca8a04" stroke-width="0.8" />
              <!-- Golden Leg Armor Greave -->
              <rect x="-34" y="-5.5" width="12" height="11" rx="2" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8" />
              <!-- Fetlock feather hair -->
              <path d="M -22 -6 C -28 -11, -32 -10, -36 -8" fill="none" stroke="#78350f" stroke-width="2" />
              <!-- Hoof Horn -->
              <path d="M -10 6 C -4 7, 6 6, 8 0 C 6 -6, -4 -7, -10 -6 Z" fill="url(#steelHoofGrad)" stroke="#09090b" stroke-width="1.2" />
              <!-- Steel Horseshoe -->
              <path d="M -4 7 C 5 7, 10 5, 10 0 C 10 -5, 5 -7, -4 -7 L -2 -5 C 5 -5, 8 -3, 8 0 C 8 3, 5 5, -2 5 Z" 
                    fill="#f8fafc" stroke="#334155" stroke-width="0.8" />
              <!-- Horseshoe Nail Studs -->
              <circle cx="2" cy="-4" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="-2" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="2" r="0.8" fill="#ca8a04" />
              <circle cx="2" cy="4" r="0.8" fill="#ca8a04" />
            </g>

          </g>
        `;
      }

      svg += `</g>`;
      setSvgHTML(fx, svg);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * 🐘 4. TƯỢNG - THẦN TƯỢNG HÚC NGÀ (MIGHTY TUSK GORE & FLING)
   * Đôi ngà voi chiến ngàn cân sáng loáng bọc đai vàng vút lên từ dưới,
   * húc tung quân địch lên không trung, để lại sóng khí húc ngược xé toạc mặt bàn.
   */
  animateElephantShatterFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    const start = performance.now();
    const duration = 440;

    // Upward ivory debris and dust particles
    const numDebris = 16;
    const debris = [];
    for (let i = 0; i < numDebris; i++) {
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.4; // upward burst
      const speed = 40 + Math.random() * 60;
      debris.push({
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: i % 3 === 0 ? '#ffffff' : (i % 3 === 1 ? '#fef08a' : '#b45309'),
        size: 3 + Math.random() * 3.5
      });
    }

    let climaxTriggered = false;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);

      // Trajectory of the tusks:
      // 0.0 - 0.28: Heavy elephant crouch, tusks position at y = +48
      // 0.28 - 0.52: Unstoppable savage UPWARD GORE thrust, y rockets to -36!
      // 0.52 - 1.0: Majestic follow-through arc, piece flung away, dissolve
      let tuskY = 0;
      let tuskScale = 1;
      let opacity = 1;

      if (p < 0.28) {
        const prep = p / 0.28;
        tuskY = 48 - 8 * prep;
        tuskScale = 0.95 + 0.1 * prep;
      } else if (p < 0.52) {
        const gore = (p - 0.28) / 0.24;
        // Savage uppercut curve
        tuskY = 40 - 76 * (1 - Math.pow(1 - gore, 3)); // from 40 to -36
        tuskScale = 1.05 + 0.15 * Math.sin(gore * Math.PI);

        if (gore >= 0.45 && !climaxTriggered) {
          climaxTriggered = true;
          if (onClimax) onClimax();
          sound.playElephantTuskGore();
        }
      } else {
        const rest = (p - 0.52) / 0.48;
        tuskY = -36 - 12 * rest;
        tuskScale = 1.2 - 0.15 * rest;
        opacity = Math.max(0, 1 - rest * 1.3);
      }

      // Shockwave progression after climax
      const shockP = Math.max(0, (p - 0.40) / 0.60);
      const shockRadius = 14 + shockP * 65;
      const shockOpacity = Math.max(0, (1 - shockP) * 0.9);

      let svg = `
        <g transform="translate(${toPoint.x}, ${toPoint.y})">
      `;

      // 1. Upward Crescent Gore Shockwaves & Gouge Trench
      if (shockP > 0) {
        svg += `
          <!-- Upward Crescent Gore Shockwave Arc (Sóng khí húc ngược) -->
          <path d="M ${-shockRadius} ${-shockRadius * 0.3} 
                   C ${-shockRadius * 0.5} ${-shockRadius * 1.2}, ${shockRadius * 0.5} ${-shockRadius * 1.2}, ${shockRadius} ${-shockRadius * 0.3}" 
                fill="none" stroke="#fef08a" stroke-width="${Math.max(1, 5 * (1 - shockP))}" stroke-linecap="round" opacity="${shockOpacity}" />
          <path d="M ${-shockRadius * 0.8} ${-shockRadius * 0.1} 
                   C ${-shockRadius * 0.4} ${-shockRadius * 0.9}, ${shockRadius * 0.4} ${-shockRadius * 0.9}, ${shockRadius * 0.8} ${-shockRadius * 0.1}" 
                fill="none" stroke="#fbbf24" stroke-width="${Math.max(1, 3 * (1 - shockP))}" stroke-linecap="round" opacity="${shockOpacity * 0.8}" />

          <!-- Deep Tusk Gouge Trenches (2 rãnh ngà cày sâu trên mặt bàn) -->
          <line x1="-16" y1="28" x2="-8" y2="-22" stroke="#78350f" stroke-width="${4 * (1 - shockP)}" stroke-linecap="round" opacity="${shockOpacity * 0.7}" />
          <line x1="16" y1="28" x2="8" y2="-22" stroke="#78350f" stroke-width="${4 * (1 - shockP)}" stroke-linecap="round" opacity="${shockOpacity * 0.7}" />

          <!-- Seismic Ground Dust Circle -->
          <circle cx="0" cy="10" r="${shockRadius * 0.8}" fill="#78350f" fill-opacity="${shockOpacity * 0.25}" stroke="#ca8a04" stroke-width="1.5" opacity="${shockOpacity}" />
        `;

        // 2. Upward Flying Debris & Ivory Dust
        debris.forEach(d => {
          const dx = d.vx * shockP;
          const dy = d.vy * shockP + (shockP * shockP * 12);
          svg += `<circle cx="${dx}" cy="${dy}" r="${d.size * (1 - shockP * 0.4)}" fill="${d.color}" opacity="${shockOpacity}" />`;
        });
      }

      // 3. THE TWIN MIGHTY CURVED IVORY TUSKS (SONG NGÀ THẦN TƯỢNG)
      if (opacity > 0) {
        svg += `
          <g transform="translate(0, ${tuskY}) scale(${tuskScale})" opacity="${opacity}">

            <!-- Thrust Energy Aura -->
            <path d="M -24 35 C -15 -10, 0 -35, 0 -42 C 0 -35, 15 -10, 24 35 Z" 
                  fill="url(#dragonAuraGrad)" opacity="${0.45 * opacity}" />

            <!-- === LEFT TUSK (NGÀ TRÁI - CONG VÚT LÊN TRÊN VÀO TRONG) === -->
            <g class="tusk-left">
              <!-- Golden Armor Root Ferrule (Đai bọc chuôi ngà nạm vàng) -->
              <path d="M -28 32 L -20 35 L -16 26 L -24 23 Z" fill="#ca8a04" stroke="#fef08a" stroke-width="1" />
              <circle cx="-22" cy="29" r="1.8" fill="#ef4444" stroke="#fef08a" stroke-width="0.5" />
              <!-- Ivory Tusk Blade (Thân ngà voi khổng lồ) -->
              <path d="M -25 24 
                       C -23 10, -18 -6, -4 -32 
                       C -7 -22, -12 -5, -15 25 
                       Z" 
                    fill="url(#ivoryTuskGrad)" 
                    stroke="#ca8a04" 
                    stroke-width="1.4" />
              <!-- Ivory Ridge Specular Highlight (Sống ngà ánh bạc) -->
              <path d="M -22 18 C -19 6, -14 -6, -5 -28" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.95" />
            </g>

            <!-- === RIGHT TUSK (NGÀ PHẢI - CONG VÚT LÊN TRÊN VÀO TRONG) === -->
            <g class="tusk-right">
              <!-- Golden Armor Root Ferrule -->
              <path d="M 28 32 L 20 35 L 16 26 L 24 23 Z" fill="#ca8a04" stroke="#fef08a" stroke-width="1" />
              <circle cx="22" cy="29" r="1.8" fill="#ef4444" stroke="#fef08a" stroke-width="0.5" />
              <!-- Ivory Tusk Blade -->
              <path d="M 25 24 
                       C 23 10, 18 -6, 4 -32 
                       C 7 -22, 12 -5, 15 25 
                       Z" 
                    fill="url(#ivoryTuskGrad)" 
                    stroke="#ca8a04" 
                    stroke-width="1.4" />
              <!-- Ivory Ridge Specular Highlight -->
              <path d="M 22 18 C 19 6, 14 -6, 5 -28" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.95" />
            </g>

            <!-- Clashing Tip Gleam Spark at climax -->
            <circle cx="0" cy="-30" r="8" fill="#ffffff" opacity="${0.8 * opacity}" filter="url(#pieceLiftedShadow)" />
            <line x1="-12" y1="-30" x2="12" y2="-30" stroke="#fef08a" stroke-width="2.5" opacity="${opacity}" />
            <line x1="0" y1="-42" x2="0" y2="-18" stroke="#fef08a" stroke-width="2.5" opacity="${opacity}" />

          </g>
        `;
      }

      svg += `</g>`;
      setSvgHTML(fx, svg);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * ⚔️ 5. SĨ - HỘ VỆ SONG ĐAO: Nhát chém chữ X sắc lẹm xé toạc mục tiêu
   */
  animateAdvisorSlashFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    if (onClimax) onClimax();

    const start = performance.now();
    const duration = 340;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const opacity = 1 - p;
      const len = 38 * (0.4 + p * 0.8);

      setSvgHTML(fx, `
        <g transform="translate(${toPoint.x}, ${toPoint.y})">
          <!-- Blade Slash 1 -->
          <line x1="${-len}" y1="${-len}" x2="${len}" y2="${len}" stroke="#ffffff" stroke-width="${4.5 * (1 - p)}" stroke-linecap="round" opacity="${opacity}" />
          <line x1="${-len}" y1="${-len}" x2="${len}" y2="${len}" stroke="#38bdf8" stroke-width="${8 * (1 - p)}" stroke-linecap="round" opacity="${opacity * 0.7}" />
          <!-- Blade Slash 2 -->
          <line x1="${len}" y1="${-len}" x2="${-len}" y2="${len}" stroke="#ffffff" stroke-width="${4.5 * (1 - p)}" stroke-linecap="round" opacity="${opacity}" />
          <line x1="${len}" y1="${-len}" x2="${-len}" y2="${len}" stroke="#38bdf8" stroke-width="${8 * (1 - p)}" stroke-linecap="round" opacity="${opacity * 0.7}" />
          <!-- Spark diamond center -->
          <circle cx="0" cy="0" r="${8 + p * 20}" fill="#fef08a" opacity="${opacity * 0.8}" />
        </g>
      `);

      if (p < 1) requestAnimationFrame(step);
      else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * 👑 6. TƯỚNG - HOÀNG LONG XUẤT TRẬN: Vầng linh khí Rồng Vàng áp đảo
   */
  animateKingDragonFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    if (onClimax) onClimax();

    const start = performance.now();
    const duration = 440;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const opacity = 1 - p;
      const r = 20 + p * 75;
      const spin = p * 180;

      setSvgHTML(fx, `
        <g transform="translate(${toPoint.x}, ${toPoint.y}) rotate(${spin})">
          <!-- Imperial Golden Dragon Halo -->
          <circle cx="0" cy="0" r="${r}" fill="url(#dragonAuraGrad)" opacity="${opacity}" />
          <circle cx="0" cy="0" r="${r * 0.8}" fill="none" stroke="#fbbf24" stroke-width="${3 * (1 - p)}" stroke-dasharray="8 6" opacity="${opacity}" />
          <circle cx="0" cy="0" r="${r * 0.5}" fill="none" stroke="#fef08a" stroke-width="2" opacity="${opacity}" />
        </g>
      `);

      if (p < 1) requestAnimationFrame(step);
      else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * 🗡️ 7. TỐT - DŨNG SĨ ĐÂM GIÁO: Mũi giáo đâm xuyên tâm với luồng sáng vàng cam
   */
  animateSoldierSpearFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    if (onClimax) onClimax();

    const start = performance.now();
    const duration = 320;
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const opacity = 1 - p;

      setSvgHTML(fx, `
        <g transform="translate(${toPoint.x}, ${toPoint.y}) rotate(${angle})">
          <!-- Piercing Spear Thrust Shaft -->
          <line x1="-40" y1="0" x2="35" y2="0" stroke="#f59e0b" stroke-width="${6 * (1 - p)}" stroke-linecap="round" opacity="${opacity}" />
          <polygon points="35,0 15,-10 15,10" fill="#fef08a" opacity="${opacity}" />
          <!-- Forward Conical Sparks -->
          <circle cx="${25 + p * 25}" cy="${-10 - p * 15}" r="3" fill="#ef4444" opacity="${opacity}" />
          <circle cx="${30 + p * 30}" cy="0" r="3.5" fill="#fef08a" opacity="${opacity}" />
          <circle cx="${25 + p * 25}" cy="${10 + p * 15}" r="3" fill="#f59e0b" opacity="${opacity}" />
        </g>
      `);

      if (p < 1) requestAnimationFrame(step);
      else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * Fallback generic capture shockwave
   */
  animateGenericCaptureFX(fromPoint, toPoint, onClimax, onComplete) {
    const fx = this.fxLayer;
    if (onClimax) onClimax();

    const start = performance.now();
    const duration = 320;

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const opacity = 1 - p;

      setSvgHTML(fx, `
        <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${10 + p * 60}" fill="none" stroke="#ef4444" stroke-width="${4 * (1 - p)}" opacity="${opacity}" />
        <circle cx="${toPoint.x}" cy="${toPoint.y}" r="${5 + p * 35}" fill="#f59e0b" fill-opacity="${opacity * 0.4}" />
      `);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setSvgHTML(fx, '');
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * ULTRA-FAST HARDWARE-ACCELERATED PIECE MOVEMENT ANIMATION
   * Replaces 60fps DOM parsing & complex arm filters with single-element transform interpolation.
   * Runs at buttery 60 FPS on any Smart TV processor.
   */
  animateMove({ from, to, piece, isAI = false, isCapture = false, capturedPiece = null, onComplete }) {
    this.isAnimating = true;
    const fromPoint = this.getPointCoords(from.r, from.c);
    const toPoint = this.getPointCoords(to.r, to.c);

    // Temporarily hide moving piece on static board
    this.hiddenCoord = { r: from.r, c: from.c };
    if (this.currentBoard) {
      this.renderPieces(this.currentBoard, this.hiddenCoord);
    }

    const startTime = performance.now();
    const duration = isAI ? 250 : 180; // Snappy 180ms - 250ms

    // Pre-render flying piece ONCE into flyingPieceLayer
    if (this.flyingPieceLayer) {
      setSvgHTML(this.flyingPieceLayer, this.renderSinglePieceSVG(piece, 0, 0, 1.1, true));
    }

    const flyingEl = this.flyingPieceLayer ? this.flyingPieceLayer.firstElementChild : null;

    const step = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Fast quad ease out
      const progress = 1 - (1 - rawProgress) * (1 - rawProgress);

      const currX = fromPoint.x + (toPoint.x - fromPoint.x) * progress;
      const currY = fromPoint.y + (toPoint.y - fromPoint.y) * progress - Math.sin(progress * Math.PI) * 14;
      const scale = 1 + 0.12 * Math.sin(progress * Math.PI);

      if (flyingEl) {
        flyingEl.setAttribute('transform', `translate(${currX}, ${currY}) scale(${scale})`);
      }

      if (rawProgress < 1) {
        requestAnimationFrame(step);
      } else {
        if (this.flyingPieceLayer) setSvgHTML(this.flyingPieceLayer, '');
        this.hiddenCoord = null;
        this.isAnimating = false;
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(step);
  }
}

