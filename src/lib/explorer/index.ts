import { db } from '../store/db.ts';
import { fetchLichess, fetchMasters } from './lichess.ts';
import { fetchOffline } from './offline.ts';
import { fetchMine } from '../mygames/tree.ts';
import type { ExplorerData, ExplorerSource, Speed } from './types.ts';

export interface ExplorerQuery {
  source: ExplorerSource;
  fen: string;
  ratings?: number[];
  speeds?: Speed[];
  /** For source 'mine': which color the player had */
  color?: 'white' | 'black';
}

const memory = new Map<string, Promise<ExplorerData>>();
const DAY = 86_400_000;

function cacheKey(q: ExplorerQuery): string {
  return [q.source, q.fen, q.ratings?.join(','), q.speeds?.join(','), q.color].join('|');
}

/** Fetches explorer data with an in-memory + IndexedDB cache (network sources are cached for a week). */
export function explore(q: ExplorerQuery): Promise<ExplorerData> {
  const key = cacheKey(q);
  const hit = memory.get(key);
  if (hit) return hit;
  const p = load(q, key);
  memory.set(key, p);
  p.catch(() => memory.delete(key));
  return p;
}

async function load(q: ExplorerQuery, key: string): Promise<ExplorerData> {
  if (q.source === 'offline') return fetchOffline(q.fen);
  if (q.source === 'mine') return fetchMine(q.fen, q.color ?? 'white');
  const store = await db();
  const cached = await store.get('explorer', key);
  if (cached && Date.now() - cached.at < 7 * DAY) return cached.data as ExplorerData;
  const data = q.source === 'masters' ? await fetchMasters(q.fen) : await fetchLichess(q.fen, q.ratings ?? [1600, 1800], q.speeds ?? ['blitz', 'rapid', 'classical']);
  store.put('explorer', { key, data, at: Date.now() }).catch(() => {});
  return data;
}
