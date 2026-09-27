import { keyOfFen, normalizeUci, uciToSan } from '../chess/moves.ts';
import { treeHash } from '../chess/key.ts';
import { nameAt } from './names.ts';
import type { ExplorerData } from './types.ts';

type Shard = Record<string, [uci: string, white: number, draws: number, black: number][]>;

export interface OfflineMeta {
  source: string;
  games: number;
  plies: number;
  ratings: [number, number];
  speeds: string[];
  minGames: number;
  positions: number;
}

const shards = new Map<string, Promise<Shard>>();
let meta: Promise<OfflineMeta | null> | null = null;

const url = (p: string) => `${import.meta.env.BASE_URL}tree/${p}`;

export function offlineMeta(): Promise<OfflineMeta | null> {
  meta ??= fetch(url('meta.json'))
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
  return meta;
}

function shard(id: string): Promise<Shard> {
  let s = shards.get(id);
  if (!s) {
    s = fetch(url(`${id}.json`))
      .then((r) => (r.ok ? (r.json() as Promise<Shard>) : {}))
      .catch(() => ({}));
    shards.set(id, s);
  }
  return s;
}

/** Bundled tree built from a Lichess monthly dump (see scripts/build-tree.ts). */
export async function fetchOffline(fen: string): Promise<ExplorerData> {
  const h = treeHash(keyOfFen(fen));
  const [data, m] = await Promise.all([shard(h.slice(0, 2)), offlineMeta()]);
  const rows = data[h] ?? [];
  const moves = rows.map(([uci, white, draws, black]) => {
    const std = normalizeUci(fen, uci);
    return { uci: std, san: uciToSan(fen, std), white, draws, black };
  });
  const sum = (k: 'white' | 'draws' | 'black') => moves.reduce((s, x) => s + x[k], 0);
  return {
    source: 'offline',
    white: sum('white'),
    draws: sum('draws'),
    black: sum('black'),
    moves,
    opening: nameAt(fen),
    note: rows.length
      ? undefined
      : m
        ? `No data: the offline tree covers ${m.plies} plies of ${m.ratings[0]}–${m.ratings[1]} games (≥${m.minGames} games per position). Log in with Lichess for the full database.`
        : 'Offline tree not built yet. Run `npm run build-tree`, or log in with Lichess.',
  };
}
