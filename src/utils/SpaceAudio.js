// Web Audio API Synthesizer for Space Atmosphere and UI Feedback
class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.muted = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.initialized = true;
      
      // Setup ambient spaceship cabin hum
      this.setupAmbientHum();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  setupAmbientHum() {
    if (!this.ctx) return;

    // Create a low frequency deep hum oscillator
    this.ambientOsc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    
    this.ambientGain = this.ctx.createGain();
    const lowpass = this.ctx.createBiquadFilter();

    // Deep hum
    this.ambientOsc.type = 'sawtooth';
    this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

    // LFO to modulate volume/pitch for a "beating" space engine hum
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // very slow oscillation
    lfoGain.gain.setValueAtTime(3, this.ctx.currentTime);

    // Filter to make it smooth and low
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(120, this.ctx.currentTime);
    lowpass.Q.setValueAtTime(1, this.ctx.currentTime);

    // Connect LFO to hum pitch modulation
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientOsc.frequency);

    // Audio routing
    this.ambientOsc.connect(lowpass);
    lowpass.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    // Initial volumes
    this.ambientGain.gain.setValueAtTime(this.muted ? 0 : 0.08, this.ctx.currentTime);

    // Start oscillators
    this.ambientOsc.start(0);
    lfo.start(0);
  }

  toggleMute(state) {
    this.init();
    
    // Resume audio context if suspended
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.muted = state !== undefined ? state : !this.muted;

    if (this.ambientGain && this.ctx) {
      const targetGain = this.muted ? 0 : 0.08;
      this.ambientGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
    }
    
    return this.muted;
  }

  // Play a quick futuristic UI blip for hovering
  playHoverBlip() {
    if (this.muted || !this.initialized || !this.ctx) return;
    if (this.ctx.state === 'suspended') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Soft high frequency beep
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Play a warp charge and trigger beep for page transitions
  playWarpTransition() {
    if (this.muted || !this.initialized || !this.ctx) return;
    if (this.ctx.state === 'suspended') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.7);

    // Play a secondary chime overlay
    setTimeout(() => {
      if (this.muted || !this.ctx) return;
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      
      chime.type = 'sine';
      chime.frequency.setValueAtTime(880, this.ctx.currentTime);
      chime.frequency.setValueAtTime(1320, this.ctx.currentTime + 0.1);
      
      chimeGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start();
      chime.stop(this.ctx.currentTime + 0.4);
    }, 200);
  }

  // Play a click confirmation sound
  playClickFeedback() {
    if (this.muted || !this.initialized || !this.ctx) return;
    if (this.ctx.state === 'suspended') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.setValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
}

export const spaceAudio = new SpaceAudioSystem();
