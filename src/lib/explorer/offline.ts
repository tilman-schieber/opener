import { keyOfFen, normalizeUci, uciToSan } from '../chess/moves.ts';
import { treeHash } from '../chess/key.ts';
import { nameAt } from './names.ts';
import type { ExplorerData } from './types.ts';

type Shard = Record<string, [uci: string, white: number, draws: number, black: number][]>;

export interface OfflineBand {
  id: string;
  source: string;
  games: number;
  plies: number;
  deepPlies?: number;
  ratings: [number, number];
  speeds: string[];
  minGames: number;
  positions: number;
  /** Directory under tree/ ('' for the old single-band layout) */
  dir: string;
}

const shards = new Map<string, Promise<Shard>>();
let bandsP: Promise<OfflineBand[]> | null = null;

const url = (p: string) => `${import.meta.env.BASE_URL}tree/${p}`;

/** The rating bands bundled with the app (tree/index.json), or the legacy single tree. */
export function offlineBands(): Promise<OfflineBand[]> {
  bandsP ??= fetch(url('index.json'))
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((j: { bands: Omit<OfflineBand, 'dir'>[] }) => j.bands.map((b) => ({ ...b, dir: `${b.id}/` })))
    .catch(() =>
      fetch(url('meta.json'))
        .then((r) => (r.ok ? r.json() : null))
        .then((m) => (m ? [{ ...m, id: `${m.ratings[0]}-${m.ratings[1]}`, dir: '' }] : []))
        .catch(() => []),
    )
    .then((bands) => {
      if (!bands.length) bandsP = null; // allow a retry once the tree exists
      return bands;
    });
  return bandsP;
}

/** The band whose range contains `rating`, else the closest one. */
export function pickBand(bands: OfflineBand[], rating: number, preferred?: string | null): OfflineBand | undefined {
  const exact = preferred ? bands.find((b) => b.id === preferred) : undefined;
  if (exact) return exact;
  return [...bands].sort((a, b) => dist(a, rating) - dist(b, rating))[0];
}

function dist(b: OfflineBand, r: number) {
  return r < b.ratings[0] ? b.ratings[0] - r : r >= b.ratings[1] ? r - b.ratings[1] + 1 : 0;
}

function shard(path: string): Promise<Shard> {
  let s = shards.get(path);
  if (!s) {
    s = fetch(url(path))
      .then((r) => (r.ok ? (r.json() as Promise<Shard>) : {}))
      .catch(() => ({}));
    shards.set(path, s);
  }
  return s;
}

/** Bundled tree built from a Lichess monthly dump (see scripts/build-tree.ts). */
export async function fetchOffline(fen: string, rating = 1600, bandId?: string | null): Promise<ExplorerData & { band?: OfflineBand }> {
  const bands = await offlineBands();
  const band = pickBand(bands, rating, bandId);
  const h = treeHash(keyOfFen(fen));
  const data = band ? await shard(`${band.dir}${h.slice(0, 2)}.json`) : {};
  const rows = data[h] ?? [];
  const moves = rows.map(([uci, white, draws, black]) => {
    const std = normalizeUci(fen, uci);
    return { uci: std, san: uciToSan(fen, std), white, draws, black };
  });
  const sum = (k: 'white' | 'draws' | 'black') => moves.reduce((s, x) => s + x[k], 0);
  return {
    source: 'offline',
    band,
    white: sum('white'),
    draws: sum('draws'),
    black: sum('black'),
    moves,
    opening: nameAt(fen),
    note: rows.length
      ? undefined
      : band
        ? `No data here: the offline tree covers the first ${band.plies} moves (half-moves)${band.deepPlies ? `, and up to ${band.deepPlies} along library lines` : ''}, for positions with at least ${band.minGames} games. Log in with Lichess for the full database.`
        : 'The offline tree is not built yet. Run `npm run build-tree`, or log in with Lichess.',
  };
}
