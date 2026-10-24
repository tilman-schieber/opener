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
  /** When the line is next due (ms); missing on records from before scheduling existed = due now */
  due?: number;
  /** Current spacing in days: doubles on a clean run, resets on a miss */
  interval?: number;
}

const DAY = 86_400_000;
/** Longest gap between two clean runs of the same line */
export const MAX_INTERVAL_DAYS = 60;

/**
 * Spacing: a clean run doubles the interval (1, 2, 4, … up to MAX_INTERVAL_DAYS days) and schedules the
 * line that far ahead; a run with mistakes resets the interval to one day and makes the line due at once,
 * so it comes back in the same session until it is played cleanly.
 */
export function schedule(s: LineStat, mistakePlies: number[], now = Date.now()): LineStat {
  s.attempts++;
  s.lastSeen = now;
  if (mistakePlies.length) {
    s.fails++;
    s.streak = 0;
    for (const p of mistakePlies) s.mistakes[p] = (s.mistakes[p] ?? 0) + 1;
    s.interval = 1;
    s.due = now;
  } else {
    s.streak++;
    s.interval = Math.min(MAX_INTERVAL_DAYS, s.interval ? s.interval * 2 : 1);
    s.due = now + s.interval * DAY;
  }
  return s;
}

export function isDue(s: LineStat | undefined, now = Date.now()): boolean {
  return !s || s.due === undefined || s.due <= now;
}

export function dueCount(lines: Pick<RepLine, 'key'>[], stats: Map<string, LineStat>, now = Date.now()): number {
  return lines.filter((l) => isDue(stats.get(l.key), now)).length;
}

/** "due", "due tomorrow", "due in 4 d" */
export function dueLabel(s: LineStat | undefined, now = Date.now()): string {
  if (isDue(s, now)) return 'due';
  const days = Math.ceil((s!.due! - now) / DAY);
  return days <= 1 ? 'due tomorrow' : `due in ${days} d`;
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
  schedule(s, mistakePlies);
  await d.put('drill', s);
  return s;
}

/**
 * Weakness score, used to weight the choice among the lines that are due: unseen lines first, then
 * lines with failures, discounted by clean streaks, growing slowly with time since last practice.
 */
export function weakness(s: LineStat | undefined, now = Date.now()): number {
  if (!s) return 10;
  const failRate = (s.fails + 1) / (s.attempts + 2);
  const days = (now - s.lastSeen) / 86_400_000;
  return failRate * 8 * Math.pow(0.5, s.streak) + Math.min(3, days / 3) + 0.2;
}

/** Picks among the lines that are due (all lines when none is), weighted by weakness; avoids repeating `avoid`. */
export function pickLine(lines: RepLine[], stats: Map<string, LineStat>, avoid?: string, now = Date.now()): RepLine {
  const due = lines.filter((l) => isDue(stats.get(l.key), now));
  const pool = due.length ? due : lines;
  const scored = pool.map((l) => ({ l, w: weakness(stats.get(l.key)) * (l.key === avoid && pool.length > 1 ? 0 : 1) }));
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

/**
 * Where to start drilling `line`: the moves it shares with a sibling line that is already solid are
 * played automatically, and the test begins where the lines diverge. Lines with no solid sibling
 * start from move one.
 */
export function drillStart(line: RepLine, lines: RepLine[], stats: Map<string, LineStat>): number {
  let start = 0;
  for (const other of lines) {
    if (other.key === line.key || lineStatus(stats.get(other.key)) !== 'solid') continue;
    let i = 0;
    while (i < line.ucis.length - 1 && i < other.ucis.length && line.ucis[i] === other.ucis[i]) i++;
    start = Math.max(start, i);
  }
  return start;
}
