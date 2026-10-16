/**
 * Web Audio API synthesizer for romantic music box & interactive sound effects.
 * Works seamlessly with zero external asset dependencies.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private musicInterval: number | null = null;
  private melodyIndex = 0;
  private customAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic music box notes: C4, D4, E4, F4, G4, A4, B4, C5, etc.
  private notes: { [key: string]: number } = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0
  };

  // Gentle romantic birthday melody
  private songNotes: { note: string; dur: number }[] = [
    { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.7 }, { note: 'G4', dur: 0.7 },
    { note: 'C5', dur: 0.7 }, { note: 'B4', dur: 1.2 },
    { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.7 }, { note: 'G4', dur: 0.7 },
    { note: 'D5', dur: 0.7 }, { note: 'C5', dur: 1.2 },
    { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'G5', dur: 0.7 }, { note: 'E5', dur: 0.7 },
    { note: 'C5', dur: 0.7 }, { note: 'B4', dur: 0.7 }, { note: 'A4', dur: 1.0 },
    { note: 'F5', dur: 0.35 }, { note: 'F5', dur: 0.35 }, { note: 'E5', dur: 0.7 }, { note: 'C5', dur: 0.7 },
    { note: 'D5', dur: 0.7 }, { note: 'C5', dur: 1.5 },
  ];

  private playTone(freq: number, duration: number, timeOffset = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sine with gentle overtone for music box / celesta chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + timeOffset);

    // Warm envelope
    const now = this.ctx.currentTime + timeOffset;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  public playNote(noteName: string, duration = 0.6) {
    this.initCtx();
    const freq = this.notes[noteName];
    if (freq) {
      this.playTone(freq, duration);
    }
  }

  public startBackgroundMelody() {
    this.initCtx();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playNext = () => {
      if (!this.isPlaying) return;
      const current = this.songNotes[this.melodyIndex % this.songNotes.length];
      const freq = this.notes[current.note];
      if (freq) {
        this.playTone(freq, current.dur);
        // Add subtle harmonic chime
        this.playTone(freq * 2, current.dur * 0.7, 0.02);
      }
      this.melodyIndex++;
      this.musicInterval = window.setTimeout(playNext, current.dur * 1000 + 120);
    };

    playNext();
  }

  public stopBackgroundMelody() {
    this.isPlaying = false;
    if (this.musicInterval) {
      window.clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic(customUrl?: string): boolean {
    if (customUrl) {
      if (!this.customAudio || this.customAudio.src !== customUrl) {
        if (this.customAudio) this.customAudio.pause();
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      if (this.isPlaying) {
        this.customAudio.pause();
        this.isPlaying = false;
        return false;
      } else {
        this.customAudio.play().catch(() => {});
        this.isPlaying = true;
        return true;
      }
    }

    if (this.isPlaying) {
      this.stopBackgroundMelody();
      return false;
    } else {
      this.startBackgroundMelody();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Sound effects
  public playWaxSealSound() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playCandleBlowSound() {
    this.initCtx();
    if (!this.ctx) return;
    // Gentle pink/white noise whoosh
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  public playChimeSuccess() {
    this.initCtx();
    if (!this.ctx) return;
    const pitches = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    pitches.forEach((freq, i) => {
      this.playTone(freq, 0.6, i * 0.1);
    });
  }

  public playHeartPop() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }
}

export const romanticAudio = new RomanticAudioManager();
