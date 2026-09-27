import { authHeaders, forget } from '../auth/lichess.svelte.ts';
import { normalizeUci } from '../chess/moves.ts';
import type { ExplorerData, ExplorerGame, Speed } from './types.ts';

const BASE = 'https://explorer.lichess.ovh';

export class ExplorerAuthError extends Error {}
export class ExplorerRateLimit extends Error {}

let rateLimitedUntil = 0;
let chain: Promise<unknown> = Promise.resolve();

/** Lichess asks API clients to make one request at a time and back off a full minute after a 429. */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = chain.then(fn, fn);
  chain = next.catch(() => {});
  return next;
}

interface RawMove {
  uci: string;
  san: string;
  white: number;
  draws: number;
  black: number;
  averageRating?: number;
}

interface RawGame {
  id: string;
  uci?: string;
  winner: 'white' | 'black' | null;
  white: { name: string; rating: number };
  black: { name: string; rating: number };
  year?: number;
  month?: string;
}

async function get(path: string, params: Record<string, string>): Promise<any> {
  if (Date.now() < rateLimitedUntil) throw new ExplorerRateLimit('Rate limited by Lichess, retrying in a minute.');
  const res = await fetch(`${BASE}/${path}?${new URLSearchParams(params)}`, { headers: authHeaders() });
  if (res.status === 401) {
    forget();
    throw new ExplorerAuthError('Lichess login required for the live explorer.');
  }
  if (res.status === 429) {
    rateLimitedUntil = Date.now() + 60_000;
    throw new ExplorerRateLimit('Rate limited by Lichess, retrying in a minute.');
  }
  if (!res.ok) throw new Error(`Explorer error ${res.status}`);
  return res.json();
}

function convert(source: 'masters' | 'lichess', fen: string, raw: any): ExplorerData {
  return {
    source,
    white: raw.white,
    draws: raw.draws,
    black: raw.black,
    opening: raw.opening ?? undefined,
    moves: (raw.moves as RawMove[]).map((m) => ({
      uci: normalizeUci(fen, m.uci),
      san: m.san,
      white: m.white,
      draws: m.draws,
      black: m.black,
      averageRating: m.averageRating,
    })),
    topGames: ((raw.topGames ?? []) as RawGame[]).map(
      (g): ExplorerGame => ({ id: g.id, white: g.white, black: g.black, winner: g.winner, year: g.year, month: g.month, uci: g.uci }),
    ),
  };
}

export function fetchMasters(fen: string): Promise<ExplorerData> {
  return serial(async () => convert('masters', fen, await get('masters', { fen, topGames: '8', moves: '20' })));
}

export function fetchLichess(fen: string, ratings: number[], speeds: Speed[]): Promise<ExplorerData> {
  return serial(async () =>
    convert(
      'lichess',
      fen,
      await get('lichess', {
        variant: 'standard',
        fen,
        ratings: ratings.join(','),
        speeds: speeds.join(','),
        topGames: '4',
        recentGames: '0',
        moves: '20',
      }),
    ),
  );
}
