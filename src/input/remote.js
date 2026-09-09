/**
 * TV REMOTE & MOUSE CONTROLLER (10-FOOT SPATIAL NAVIGATION)
 * Supports:
 * - Smart TV D-Pad (Up, Down, Left, Right, OK, Back)
 * - Android TV, LG webOS, Samsung Tizen keycodes
 * - 4 Color keys (Red, Green, Yellow, Blue)
 * - Seamless mouse & touch interaction
 * - Onscreen Virtual TV Remote for desktop testing
 */

import { sound } from '../audio/sound.js';

export class TVInputController {
  constructor(options = {}) {
    this.boardCols = 9;
    this.boardRows = 10;

    // Navigation state
    this.area = options.initialArea || 'home'; // 'home' | 'board' | 'sidebar' | 'modal'
    this.cursor = { r: 9, c: 4 }; // Start on Red King
    this.sidebarIndex = 0;
    this.modalIndex = 0;

    // Callbacks
    this.onHomeKey = options.onHomeKey || null;
    this.onCursorMove = options.onCursorMove || (() => {});
    this.onSelectCell = options.onSelectCell || (() => {});
    this.onBack = options.onBack || (() => {});
    this.onColorKey = options.onColorKey || (() => {});
    this.onSidebarFocusChange = options.onSidebarFocusChange || (() => {});
    this.onSidebarSelect = options.onSidebarSelect || (() => {});
    this.getSidebarButtons = options.getSidebarButtons || (() => []);
    this.getModalButtons = options.getModalButtons || (() => []);

    this.bindKeyboard();
  }

  setArea(newArea) {
    this.area = newArea;
    if (newArea === 'board') {
      this.onCursorMove(this.cursor.r, this.cursor.c);
    } else if (newArea === 'sidebar') {
      this.onSidebarFocusChange(this.sidebarIndex);
    }
  }

  setCursor(r, c) {
    this.cursor.r = Math.max(0, Math.min(this.boardRows - 1, r));
    this.cursor.c = Math.max(0, Math.min(this.boardCols - 1, c));
    this.area = 'board';
    this.onCursorMove(this.cursor.r, this.cursor.c);
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleKeyDown(e) {
    const key = e.key;
    const code = e.keyCode;

    // Home screen area navigation
    if (this.area === 'home') {
      if (this.onHomeKey && this.onHomeKey(e)) {
        return;
      }
    }

    // TV Color Keys detection
    // 403/Red, 404/Green, 405/Yellow, 406/Blue on Tizen/webOS
    if (key === 'ColorF0Red' || code === 403 || key === '1' || key === 'r' || key === 'F1') {
      e.preventDefault();
      sound.playSelect();
      this.onColorKey('red');
      return;
    }
    if (key === 'ColorF1Green' || code === 404 || key === '2' || key === 'g' || key === 'F2') {
      e.preventDefault();
      sound.playSelect();
      this.onColorKey('green');
      return;
    }
    if (key === 'ColorF2Yellow' || code === 405 || key === '3' || key === 'y' || key === 'F3') {
      e.preventDefault();
      sound.playSelect();
      this.onColorKey('yellow');
      return;
    }
    if (key === 'ColorF3Blue' || code === 406 || key === '4' || key === 'b' || key === 'F4') {
      e.preventDefault();
      sound.playSelect();
      this.onColorKey('blue');
      return;
    }

    // Modal navigation trap
    if (this.area === 'modal') {
      this.handleModalKey(e);
      return;
    }

    // Standard D-pad Navigation
    switch (key) {
      case 'ArrowUp':
      case 'Up':
      case 19: // Android DPAD_UP
        e.preventDefault();
        this.moveUp();
        break;

      case 'ArrowDown':
      case 'Down':
      case 20: // Android DPAD_DOWN
        e.preventDefault();
        this.moveDown();
        break;

      case 'ArrowLeft':
      case 'Left':
      case 21: // Android DPAD_LEFT
        e.preventDefault();
        this.moveLeft();
        break;

      case 'ArrowRight':
      case 'Right':
      case 22: // Android DPAD_RIGHT
        e.preventDefault();
        this.moveRight();
        break;

      case 'Enter':
      case ' ':
      case 'Select':
      case 13: // Enter
      case 23: // Android DPAD_CENTER
      case 66: // Android ENTER
        e.preventDefault();
        this.confirmAction();
        break;

      case 'Escape':
      case 'Backspace':
      case 'GoBack':
      case 27:   // Escape
      case 8:    // Backspace
      case 4:    // Android BACK
      case 10009:// Tizen BACK
      case 461:  // webOS BACK
        e.preventDefault();
        this.cancelAction();
        break;

      case 'm':
      case 'M':
      case 'ContextMenu':
        e.preventDefault();
        this.onColorKey('menu');
        break;
    }
  }

  moveUp() {
    if (this.area === 'board') {
      if (this.cursor.r > 0) {
        this.cursor.r--;
        sound.playNavigate();
        this.onCursorMove(this.cursor.r, this.cursor.c);
      }
    } else if (this.area === 'sidebar') {
      const btns = this.getSidebarButtons();
      if (btns.length > 0) {
        this.sidebarIndex = (this.sidebarIndex - 1 + btns.length) % btns.length;
        sound.playNavigate();
        this.onSidebarFocusChange(this.sidebarIndex);
      }
    }
  }

  moveDown() {
    if (this.area === 'board') {
      if (this.cursor.r < this.boardRows - 1) {
        this.cursor.r++;
        sound.playNavigate();
        this.onCursorMove(this.cursor.r, this.cursor.c);
      }
    } else if (this.area === 'sidebar') {
      const btns = this.getSidebarButtons();
      if (btns.length > 0) {
        this.sidebarIndex = (this.sidebarIndex + 1) % btns.length;
        sound.playNavigate();
        this.onSidebarFocusChange(this.sidebarIndex);
      }
    }
  }

  moveLeft() {
    if (this.area === 'board') {
      if (this.cursor.c > 0) {
        this.cursor.c--;
        sound.playNavigate();
        this.onCursorMove(this.cursor.r, this.cursor.c);
      }
    } else if (this.area === 'sidebar') {
      // Transition from sidebar back to board
      this.area = 'board';
      this.cursor.c = 8; // Right edge of board
      sound.playNavigate();
      this.onSidebarFocusChange(-1); // Blur sidebar
      this.onCursorMove(this.cursor.r, this.cursor.c);
    }
  }

  moveRight() {
    if (this.area === 'board') {
      if (this.cursor.c < this.boardCols - 1) {
        this.cursor.c++;
        sound.playNavigate();
        this.onCursorMove(this.cursor.r, this.cursor.c);
      } else {
        // Transition from right edge of board to sidebar
        const btns = this.getSidebarButtons();
        if (btns.length > 0) {
          this.area = 'sidebar';
          // Estimate closest sidebar button based on row
          this.sidebarIndex = Math.min(btns.length - 1, Math.floor((this.cursor.r / 10) * btns.length));
          sound.playNavigate();
          this.onCursorMove(-1, -1); // Hide board cursor focus highlight
          this.onSidebarFocusChange(this.sidebarIndex);
        }
      }
    }
  }

  confirmAction() {
    if (this.area === 'board') {
      this.onSelectCell(this.cursor.r, this.cursor.c);
    } else if (this.area === 'sidebar') {
      sound.playSelect();
      this.onSidebarSelect(this.sidebarIndex);
    }
  }

  cancelAction() {
    if (this.area === 'sidebar') {
      // Return to board
      this.area = 'board';
      this.onSidebarFocusChange(-1);
      this.onCursorMove(this.cursor.r, this.cursor.c);
    } else {
      this.onBack();
    }
  }

  handleModalKey(e) {
    const btns = this.getModalButtons();
    if (btns.length === 0) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.modalIndex = (this.modalIndex + 1) % btns.length;
      sound.playNavigate();
      this.focusModalButton(this.modalIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.modalIndex = (this.modalIndex - 1 + btns.length) % btns.length;
      sound.playNavigate();
      this.focusModalButton(this.modalIndex);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      sound.playSelect();
      if (btns[this.modalIndex]) {
        btns[this.modalIndex].click();
      }
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      e.preventDefault();
      this.onBack();
    }
  }

  focusModalButton(index) {
    const btns = this.getModalButtons();
    btns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('tv-focused');
        btn.focus();
      } else {
        btn.classList.remove('tv-focused');
      }
    });
  }
}
