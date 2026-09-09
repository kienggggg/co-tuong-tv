/**
 * PROCEDURAL AUDIO & TACTILE JUICINESS ENGINE
 * Multi-layer procedural wood clack/thump synthesis via Web Audio API,
 * Screen Shake trigger, and Vietnamese Voice Callout ("Chiếu tướng!").
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.85;
    this.speechEnabled = true;
    this.onShakeScreen = null; // Callback to trigger CSS screen shake
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setShakeCallback(fn) {
    this.onShakeScreen = fn;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  triggerScreenShake(intensity = 'medium') {
    if (this.onShakeScreen) {
      this.onShakeScreen(intensity);
    }
  }

  /**
   * Voice callout in Vietnamese using Web Speech Synthesis
   */
  speakVoice(text) {
    if (this.isMuted || !this.speechEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.1; // Energetic cadence
      utterance.pitch = 1.0;
      utterance.volume = this.volume;

      // Find Vietnamese voice if available
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang && v.lang.startsWith('vi'));
      if (viVoice) {
        utterance.voice = viVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  /**
   * Subtle tick for TV remote D-pad navigation
   */
  playNavigate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);

      gain.gain.setValueAtTime(0.06 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  }

  /**
   * Select piece sound: crisp wood ping
   */
  playSelect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.04);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  /**
   * REALISTIC SOLID WOOD STRIKE ("CẮC / ĐỘP")
   * Combines sub-bass thump, bandpassed physical wood crack, and acoustic cavity resonance.
   */
  playMove() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Layer 1: Sub-bass Wood Thump (khối gỗ dày nện xuống bàn)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.09);

      subGain.gain.setValueAtTime(0.65 * this.volume, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.09);

      // Layer 2: Hard Wood Surface Impact (tiếng cành cạch đanh giòn)
      const bufferSize = this.ctx.sampleRate * 0.045;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.007));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1500, now);
      filter.Q.setValueAtTime(3.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.75 * this.volume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);

      // Layer 3: Wood Chamber Ring (tiếng thùng bàn cờ vang nhẹ)
      const ringOsc = this.ctx.createOscillator();
      const ringGain = this.ctx.createGain();
      ringOsc.type = 'triangle';
      ringOsc.frequency.setValueAtTime(260, now);
      ringOsc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

      ringGain.gain.setValueAtTime(0.25 * this.volume, now);
      ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      ringOsc.connect(ringGain);
      ringGain.connect(this.ctx.destination);
      ringOsc.start(now);
      ringOsc.stop(now + 0.08);

      // Subtle haptic shake
      this.triggerScreenShake('light');
    } catch (e) {}
  }

  /**
   * HEAVY CAPTURE IMPACT ("ĐỘP!" ĂN QUÂN CỰC MẠNH)
   * High energy double-crack with massive sub-bass rumble and screen shake!
   */
  playCapture() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Layer 1: Sub-woofer Thump (tiếng dằn mạnh rung chuyển)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(180, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.16);

      subGain.gain.setValueAtTime(1.0 * this.volume, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.16);

      // Layer 2: Heavy Wood Shatter Crack
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Multi-peak impact crack
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.014));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.95 * this.volume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);

      // Layer 3: Solid Lim Wood Resonance
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(320, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

      bodyGain.gain.setValueAtTime(0.45 * this.volume, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.12);

      // Trigger heavy tactile screen shake!
      this.triggerScreenShake('heavy');
    } catch (e) {}
  }

  /**
   * CHECK ALERT (CHUÔNG ĐỒNG UY NGHI & LỜI XƯỚNG "CHIẾU TƯỚNG!")
   */
  playCheck() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Imperial bronze gong chord: A3, E4, A4, C#5
      const freqs = [220, 329.63, 440, 554.37];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);

        const startTime = now + idx * 0.03;
        gain.gain.setValueAtTime(0.3 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });

      // Rattle screen
      this.triggerScreenShake('medium');

      // Voice callout: "Chiếu tướng!"
      setTimeout(() => {
        this.speakVoice("Chiếu tướng!");
      }, 150);
    } catch (e) {}
  }

  /**
   * VICTORY FANFARE & VOICE CALLOUT
   */
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const durations = [0.16, 0.16, 0.16, 0.22, 0.22, 0.7];

      let timeOffset = 0;
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        const dur = durations[i];
        gain.gain.setValueAtTime(0.25 * this.volume, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + dur + 0.05);

        timeOffset += dur * 0.85;
      });

      setTimeout(() => {
        this.speakVoice("Chiếu bí! Chiến thắng vang dội!");
      }, 600);
    } catch (e) {}
  }

  playDefeat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [440, 392, 349.23, 293.66];

      let timeOffset = 0;
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        const dur = 0.35;
        gain.gain.setValueAtTime(0.2 * this.volume, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + dur + 0.05);

        timeOffset += dur * 0.75;
      });

      setTimeout(() => {
        this.speakVoice("Ván cờ kết thúc!");
      }, 700);
    } catch (e) {}
  }

  playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.08);

      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  /**
   * 💥 PHÁO NỔ ĐẠI BÁC (CANNON FIRE BLAST)
   * Nòng pháo bắn phá, tiếng nổ đại bác xé gió rền vang mặt đất
   */
  playCannonBlast() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Muzzle launch whoosh & fire trail
      const launchOsc = this.ctx.createOscillator();
      const launchGain = this.ctx.createGain();
      launchOsc.type = 'sawtooth';
      launchOsc.frequency.setValueAtTime(320, now);
      launchOsc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      launchGain.gain.setValueAtTime(0.4 * this.volume, now);
      launchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      launchOsc.connect(launchGain);
      launchGain.connect(this.ctx.destination);
      launchOsc.start(now);
      launchOsc.stop(now + 0.12);

      // 2. High-energy explosion detonation (Noise burst)
      const bufferSize = this.ctx.sampleRate * 0.28;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now + 0.04);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.28);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(1.0 * this.volume, now + 0.04);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now + 0.04);

      // 3. Sub-bass seismic shockwave (20Hz-60Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now + 0.04);
      subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.35);
      subGain.gain.setValueAtTime(1.0 * this.volume, now + 0.04);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now + 0.04);
      subOsc.stop(now + 0.35);

      this.triggerScreenShake('heavy');
    } catch (e) {}
  }

  /**
   * ⚡ XE - CHIẾN XA THIẾT KỴ (CHARIOT THUNDER CHARGE)
   * Vệt kiếm quang lao vút xé gió và cú húc rung chuyển
   */
  playChariotCharge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Rushing sword wind
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.35 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);

      // Heavy iron clash
      setTimeout(() => this.playCapture(), 40);
      this.triggerScreenShake('heavy');
    } catch (e) {}
  }

  /**
   * 🐎 MÃ - CHIẾN MÃ ĐÁ VÓ (REARING STALLION TWIN HOOF KICK)
   * Tiếng ngựa hí xung trận kết hợp cú song cước đá tung đối thủ
   */
  playHorseKick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Warhorse whinny / snort cadence (ngựa hí xung trận)
      const whinny = this.ctx.createOscillator();
      const wGain = this.ctx.createGain();
      whinny.type = 'sawtooth';
      whinny.frequency.setValueAtTime(650, now);
      whinny.frequency.exponentialRampToValueAtTime(850, now + 0.05);
      whinny.frequency.exponentialRampToValueAtTime(520, now + 0.12);
      wGain.gain.setValueAtTime(0.22 * this.volume, now);
      wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      whinny.connect(wGain);
      wGain.connect(this.ctx.destination);
      whinny.start(now);
      whinny.stop(now + 0.12);

      // 2. Twin Hoof Kick Impact (Song cước móng sắt giáng mạnh)
      setTimeout(() => {
        // Kick 1
        const kick1 = this.ctx.createOscillator();
        const kGain1 = this.ctx.createGain();
        kick1.type = 'triangle';
        kick1.frequency.setValueAtTime(320, this.ctx.currentTime);
        kick1.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.08);
        kGain1.gain.setValueAtTime(0.6 * this.volume, this.ctx.currentTime);
        kGain1.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        kick1.connect(kGain1);
        kGain1.connect(this.ctx.destination);
        kick1.start();
        kick1.stop(this.ctx.currentTime + 0.08);

        // Kick 2 (Crushing blow)
        setTimeout(() => {
          this.playCapture();
          this.triggerScreenShake('heavy');
        }, 50);
      }, 30);
    } catch (e) {}
  }

  /**
   * 🐘 TƯỢNG - THẦN TƯỢNG HÚC NGÀ (MIGHTY TUSK GORE & FLING)
   * Tiếng voi rống gầm vang và cú húc ngà ngàn cân hất tung đối thủ
   */
  playElephantTuskGore() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Elephant Trumpet Battle Roar (Tiếng voi gầm xung trận)
      const roar = this.ctx.createOscillator();
      const rGain = this.ctx.createGain();
      roar.type = 'sawtooth';
      roar.frequency.setValueAtTime(240, now);
      roar.frequency.exponentialRampToValueAtTime(460, now + 0.08);
      roar.frequency.exponentialRampToValueAtTime(180, now + 0.18);
      rGain.gain.setValueAtTime(0.35 * this.volume, now);
      rGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      roar.connect(rGain);
      rGain.connect(this.ctx.destination);
      roar.start(now);
      roar.stop(now + 0.18);

      // 2. Powerful Ivory Tusk Piercing Blow (Cú húc ngà xé toạc)
      setTimeout(() => {
        const sub = this.ctx.createOscillator();
        const sGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(160, this.ctx.currentTime);
        sub.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.22);
        sGain.gain.setValueAtTime(1.0 * this.volume, this.ctx.currentTime);
        sGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
        sub.connect(sGain);
        sGain.connect(this.ctx.destination);
        sub.start();
        sub.stop(this.ctx.currentTime + 0.22);

        this.playCapture();
        this.triggerScreenShake('heavy');
      }, 40);
    } catch (e) {}
  }

  /**
   * ⚔️ SĨ - HỘ VỆ SONG ĐAO (ADVISOR SWIFT SLASH)
   * Nhát chém chữ X sắc lẹm xé toạc đối thủ
   */
  playAdvisorSlash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Slash 1
      const s1 = this.ctx.createOscillator();
      const g1 = this.ctx.createGain();
      s1.type = 'sawtooth';
      s1.frequency.setValueAtTime(1400, now);
      s1.frequency.exponentialRampToValueAtTime(350, now + 0.07);
      g1.gain.setValueAtTime(0.35 * this.volume, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      s1.connect(g1);
      g1.connect(this.ctx.destination);
      s1.start(now);
      s1.stop(now + 0.07);

      // Slash 2
      const s2 = this.ctx.createOscillator();
      const g2 = this.ctx.createGain();
      s2.type = 'sawtooth';
      s2.frequency.setValueAtTime(1600, now + 0.06);
      s2.frequency.exponentialRampToValueAtTime(400, now + 0.14);
      g2.gain.setValueAtTime(0.4 * this.volume, now + 0.06);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      s2.connect(g2);
      g2.connect(this.ctx.destination);
      s2.start(now + 0.06);
      s2.stop(now + 0.14);

      setTimeout(() => this.triggerScreenShake('medium'), 60);
    } catch (e) {}
  }

  /**
   * 👑 TƯỚNG - HOÀNG LONG XUẤT TRẬN (IMPERIAL DRAGON ROAR)
   * Tiếng chuông hoàng cung vang rền và linh khí rồng vàng
   */
  playKingRoar() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [130.81, 196.00, 261.63, 392.00, 523.25]; // Imperial C major
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.02);
        gain.gain.setValueAtTime(0.35 * this.volume, now + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.02 + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.02);
        osc.stop(now + idx * 0.02 + 0.95);
      });
      this.triggerScreenShake('heavy');
    } catch (e) {}
  }

  /**
   * 🗡️ TỐT - DŨNG SĨ ĐÂM GIÁO (INFANTRY SPEAR THRUST)
   * Mũi giáo xung kích xuyên phá dứt khoát
   */
  playSoldierThrust() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
      gain.gain.setValueAtTime(0.5 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);

      this.playMove();
      this.triggerScreenShake('light');
    } catch (e) {}
  }

  /**
   * Dispatch capture sound by piece type
   */
  playPieceCapture(pieceLetter) {
    if (!pieceLetter) {
      this.playCapture();
      return;
    }
    const p = pieceLetter.toUpperCase();
    switch (p) {
      case 'C':
        this.playCannonBlast();
        break;
      case 'R':
        this.playChariotCharge();
        break;
      case 'H':
        this.playHorseKick();
        break;
      case 'E':
        this.playElephantTuskGore();
        break;
      case 'A':
        this.playAdvisorSlash();
        break;
      case 'K':
        this.playKingRoar();
        break;
      case 'P':
        this.playSoldierThrust();
        break;
      default:
        this.playCapture();
    }
  }

  /**
   * Đồng hồ thi đấu: Tiếng tíc tắc khi sắp hết giờ (< 30s)
   */
  playClockTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.02);
      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch (e) {}
  }

  /**
   * Hết thời gian thi đấu (Time Out)
   */
  playTimeOut() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [350, 280, 200];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.25 * this.volume, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.17);
      });
      setTimeout(() => {
        this.speakVoice("Hết giờ thi đấu!");
      }, 500);
    } catch (e) {}
  }
}

export const sound = new SoundEffects();

