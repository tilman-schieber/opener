import { db } from '../store/db.ts';
import type { RepLine } from '../repertoire/model.ts';

export interface LineStat {
  key: string;
  attempts: number;
  fails: number;
  /** consecutive clean runs */
  streak: number;
  lastSeen: number;
  /** Ply indices where mistakes happened, with counts */
  mistakes: Record<number, number>;
}

export async function statsFor(keys: string[]): Promise<Map<string, LineStat>> {
  const d = await db();
  const out = new Map<string, LineStat>();
  await Promise.all(
    keys.map(async (k) => {
      const s = await d.get('drill', k);
      if (s) out.set(k, s);
    }),
  );
  return out;
}

export async function recordRun(key: string, mistakePlies: number[]): Promise<LineStat> {
  const d = await db();
  const s: LineStat = (await d.get('drill', key)) ?? { key, attempts: 0, fails: 0, streak: 0, lastSeen: 0, mistakes: {} };
  s.attempts++;
  s.lastSeen = Date.now();
  if (mistakePlies.length) {
    s.fails++;
    s.streak = 0;
    for (const p of mistakePlies) s.mistakes[p] = (s.mistakes[p] ?? 0) + 1;
  } else s.streak++;
  await d.put('drill', s);
  return s;
}

/**
 * Weakness score: unseen lines first, then lines with failures, discounted by clean streaks,
 * growing slowly with time since last practice. Not strict spaced repetition—just "work on what's weak".
 */
export function weakness(s: LineStat | undefined, now = Date.now()): number {
  if (!s) return 10;
  const failRate = (s.fails + 1) / (s.attempts + 2);
  const days = (now - s.lastSeen) / 86_400_000;
  return failRate * 8 * Math.pow(0.5, s.streak) + Math.min(3, days / 3) + 0.2;
}

export function pickLine(lines: RepLine[], stats: Map<string, LineStat>, avoid?: string): RepLine {
  const scored = lines.map((l) => ({ l, w: weakness(stats.get(l.key)) * (l.key === avoid && lines.length > 1 ? 0 : 1) }));
  const sum = scored.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * sum;
  for (const x of scored) {
    r -= x.w;
    if (r <= 0) return x.l;
  }
  return scored[0].l;
}

export function lineStatus(s: LineStat | undefined): 'new' | 'weak' | 'learning' | 'solid' {
  if (!s) return 'new';
  if (s.streak >= 3) return 'solid';
  if (s.fails > 0 && s.streak === 0) return 'weak';
  return 'learning';
}
