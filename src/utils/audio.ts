/**
 * Pure Web Audio API Synthesizer for Ambient Nature Sounds & Voice Speech
 * 100% Offline, lightweight, zero assets required!
 */

class NatureAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private noiseNode: AudioNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public startForestBreeze() {
    this.initCtx();
    if (!this.ctx || this.isPlaying) return;

    this.ctx.resume();
    this.isPlaying = true;

    // Buffer size 2 seconds
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise generator for gentle breeze
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.03; // Soft volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Low-pass filter for wind effect
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO for slow swelling wind
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // 0.15 Hz wind sway

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    whiteNoise.start();
    lfo.start();

    this.noiseNode = whiteNoise;
  }

  public stopForestBreeze() {
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
      } catch (e) {
        console.warn(e);
      }
      this.noiseNode = null;
    }
    this.isPlaying = false;
  }

  public playTimerCompleteChime() {
    this.initCtx();
    if (!this.ctx) return;

    this.ctx.resume();
    const now = this.ctx.currentTime;
    
    // Play warm pentatonic chime sequence (C5, E5, G5, C6)
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.18);

      gain.gain.setValueAtTime(0, now + idx * 0.18);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.18 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + idx * 0.18);
      osc.stop(now + idx * 0.18 + 1.3);
    });
  }
}

export const natureAudio = new NatureAudioSynth();

/**
 * Web Speech API Text-to-Speech reader
 */
export function speakText(text: string) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  
  // Pick a natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
