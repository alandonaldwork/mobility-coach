export interface SpeechOptions {
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export function formatSpeechText(text: string): string {
  return text
    .replace(/\bsecs?\b/gi, "seconds")
    .replace(/\s*\/\s*/g, " each ")
    .replace(/\s+/g, " ")
    .trim();
}

export function playChimeSound(frequency = 659.25, duration = 0.35) {
  try {
    if (typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.33, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, duration * 1000 + 100);
  } catch {
    // Browser audio policy may silence if unprompted, ignore gracefully
  }
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;

      this.loadVoices();

      this.synth.addEventListener("voiceschanged", () => {
        this.loadVoices();
      });
    }
  }

  private loadVoices() {
    if (!this.synth) return;

    this.voices = this.synth.getVoices();
  }

  getVoices() {
    return this.voices;
  }

  isSupported() {
    return this.synth !== null;
  }

  speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth) return;
    // Prevent old announcements from piling up
    this.synth.cancel();

    const formattedText = formatSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(formattedText);

    utterance.voice = options.voice ?? null;
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    utterance.lang = options.lang ?? "en-US";

    this.synth.speak(utterance);
  }

  stop() {
    this.synth?.cancel();
  }

  pause() {
    this.synth?.pause();
  }

  resume() {
    this.synth?.resume();
  }

  countdown(seconds: number, options?: SpeechOptions) {
    for (let i = seconds; i > 0; i--) {
      setTimeout(
        () => {
          this.speak(String(i), {
            ...options,
            rate: 1.1,
          });
        },
        (seconds - i) * 1000,
      );
    }
  }

  exerciseName(name: string, options?: SpeechOptions) {
    this.speak(name, options);
  }

  switchSides(options?: SpeechOptions) {
    playChimeSound(659.25, 0.35);
    setTimeout(() => {
      this.speak("Halfway. Switch sides!", {
        ...options,
        rate: 1,
      });
    }, 200);
  }

  breathingCue(
    inhale: number,
    hold: number,
    exhale: number,
    options?: SpeechOptions,
  ) {
    this.speak(
      `Breathe in for ${inhale} seconds. Hold for ${hold} seconds. Exhale for ${exhale} seconds.`,
      options,
    );
  }
}

export const speechService = new SpeechService();
