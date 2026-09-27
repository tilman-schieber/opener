import { explore } from '../explorer/index.ts';
import { total, type ExplorerData, type ExplorerSource } from '../explorer/types.ts';
import { keyOfFen, uciToSan } from '../chess/moves.ts';
import { getPlayEngine } from '../engine/engine.ts';
import { ratingBands } from '../settings.svelte.ts';
import type { RepNode } from '../repertoire/model.ts';
import type { MovePhase } from './types.ts';

export interface OpponentConfig {
  /** Position index of the repertoire (transposition-aware) */
  book: Map<string, RepNode[]>;
  /** UCI moves of the chosen target line; followed while the game stays on it */
  target: string[];
  humanRating: number;
  humanMinGames: number;
  engineElo: number;
  /** 'lichess' when logged in, else 'offline' */
  source: ExplorerSource;
}

export interface OpponentMove {
  uci: string;
  san: string;
  phase: Exclude<MovePhase, 'player'>;
  games?: number;
  /** Short explanation for the status line */
  reason: string;
}

/** Weighted random choice; ignores moves played in less than 3% of games so blunders stay rare. */
export function pickWeighted(data: ExplorerData, rand = Math.random): string | undefined {
  const all = total(data) || data.moves.reduce((s, m) => s + total(m), 0);
  const pool = data.moves.filter((m) => total(m) >= all * 0.03);
  const sum = pool.reduce((s, m) => s + total(m), 0);
  let r = rand() * sum;
  for (const m of pool) {
    r -= total(m);
    if (r <= 0) return m.uci;
  }
  return pool[0]?.uci;
}

/**
 * Chooses the opponent's move: (1) the target line while the game is on it, (2) any repertoire
 * move in this position, (3) a human-like move weighted by explorer statistics at the chosen
 * rating, (4) Stockfish at the configured strength.
 */
export async function chooseMove(
  cfg: OpponentConfig,
  fen: string,
  playedUcis: string[],
  stage: { outOfDb: boolean },
): Promise<OpponentMove> {
  const ply = playedUcis.length;
  const onTarget = playedUcis.every((u, i) => cfg.target[i] === u);
  if (onTarget && ply < cfg.target.length) {
    const uci = cfg.target[ply];
    return { uci, san: uciToSan(fen, uci), phase: 'book', reason: 'Following your chosen line' };
  }
  const bookMoves = cfg.book.get(keyOfFen(fen));
  if (bookMoves?.length) {
    const c = bookMoves[Math.floor(Math.random() * bookMoves.length)];
    return { uci: c.uci, san: uciToSan(fen, c.uci), phase: 'book', reason: 'Repertoire move' };
  }
  if (!stage.outOfDb) {
    try {
      const data = await explore(
        cfg.source === 'lichess'
          ? { source: 'lichess', fen, ratings: ratingBands(cfg.humanRating), speeds: ['blitz', 'rapid', 'classical'] }
          : { source: 'offline', fen },
      );
      const games = total(data);
      if (games >= cfg.humanMinGames) {
        const uci = pickWeighted(data);
        if (uci) {
          const m = data.moves.find((x) => x.uci === uci)!;
          const share = Math.round((total(m) / games) * 100);
          return { uci, san: m.san, phase: 'human', games, reason: `Human choice: played in ${share}% of ${games.toLocaleString()} games` };
        }
      }
    } catch {
      /* network trouble: fall through to the engine */
    }
    stage.outOfDb = true;
  }
  const a = await getPlayEngine().go(fen, { movetime: 600 + Math.random() * 600, strength: { elo: cfg.engineElo } });
  const uci = a.bestmove!;
  return { uci, san: uciToSan(fen, uci), phase: 'engine', reason: `Stockfish (~${cfg.engineElo})` };
}
