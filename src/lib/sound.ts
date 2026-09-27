import { settings } from './settings.svelte.ts';

let ctx: AudioContext | null = null;

/** Short synthesized wooden "tock"; captures are a little lower and louder. */
export function moveSound(capture = false) {
  if (!settings.sound) return;
  try {
    ctx ??= new AudioContext();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(capture ? 420 : 620, t);
    o.frequency.exponentialRampToValueAtTime(capture ? 140 : 220, t + 0.08);
    g.gain.setValueAtTime(capture ? 0.35 : 0.22, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.13);
  } catch {
    /* audio unavailable */
  }
}

export function chime(good: boolean) {
  if (!settings.sound) return;
  try {
    ctx ??= new AudioContext();
    const t = ctx.currentTime;
    const notes = good ? [660, 880] : [300, 220];
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.15, t + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.2);
      o.connect(g).connect(ctx!.destination);
      o.start(t + i * 0.09);
      o.stop(t + i * 0.09 + 0.21);
    });
  } catch {
    /* audio unavailable */
  }
}
