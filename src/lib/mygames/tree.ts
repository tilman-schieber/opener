import { INITIAL_FEN, keyOfFen, playUci } from '../chess/moves.ts';
import { db } from '../store/db.ts';
import type { ExplorerData, ExplorerGame } from '../explorer/types.ts';
import type { ImportedGame } from './types.ts';

interface Node {
  moves: Map<string, { san: string; white: number; draws: number; black: number }>;
  games: ImportedGame[];
}

type Tree = Map<string, Node>;

/** Which accounts feed the "My games" tree; empty = all. */
export const mineFilter: { accounts: string[] } = { accounts: [] };

let trees: Record<'white' | 'black', Tree> | null = null;

export function invalidateMine() {
  trees = null;
}

async function build(): Promise<Record<'white' | 'black', Tree>> {
  const all = await (await db()).getAll('mygames');
  const out = { white: new Map(), black: new Map() } as Record<'white' | 'black', Tree>;
  for (const g of all) {
    if (mineFilter.accounts.length && !mineFilter.accounts.includes(g.account)) continue;
    const tree = out[g.color];
    let fen = INITIAL_FEN;
    // results stored from White's perspective in the explorer format
    const w = g.result === 'draw' ? 'draws' : (g.result === 'win') === (g.color === 'white') ? 'white' : 'black';
    for (const uci of g.moves.slice(0, 30)) {
      const k = keyOfFen(fen);
      const p = playUci(fen, uci);
      if (!p) break;
      let node = tree.get(k);
      if (!node) tree.set(k, (node = { moves: new Map(), games: [] }));
      let m = node.moves.get(p.uci);
      if (!m) node.moves.set(p.uci, (m = { san: p.san, white: 0, draws: 0, black: 0 }));
      m[w]++;
      if (node.games.length < 200) node.games.push(g);
      fen = p.fen;
    }
  }
  return out;
}

/** Explorer data built from the user's imported games (like openingtree.com). */
export async function fetchMine(fen: string, color: 'white' | 'black'): Promise<ExplorerData> {
  trees ??= await build();
  const node = trees[color].get(keyOfFen(fen));
  const moves = node ? [...node.moves].map(([uci, m]) => ({ uci, ...m })).sort((a, b) => b.white + b.draws + b.black - (a.white + a.draws + a.black)) : [];
  const sum = (k: 'white' | 'draws' | 'black') => moves.reduce((s, x) => s + x[k], 0);
  const topGames: ExplorerGame[] = (node?.games ?? [])
    .slice()
    .sort((a, b) => b.date - a.date)
    .slice(0, 8)
    .map((g) => ({
      id: g.id,
      white: { name: g.color === 'white' ? 'You' : g.opponent, rating: g.color === 'white' ? 0 : (g.opponentRating ?? 0) },
      black: { name: g.color === 'black' ? 'You' : g.opponent, rating: g.color === 'black' ? 0 : (g.opponentRating ?? 0) },
      winner: g.result === 'draw' ? null : (g.result === 'win') === (g.color === 'white') ? 'white' : 'black',
      year: new Date(g.date).getFullYear(),
      month: g.url,
    }));
  return {
    source: 'mine',
    white: sum('white'),
    draws: sum('draws'),
    black: sum('black'),
    moves,
    topGames,
    note: moves.length ? undefined : trees.white.size + trees.black.size === 0 ? 'No games imported yet.' : `None of your games as ${color} reached this position.`,
  };
}
