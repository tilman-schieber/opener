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
  /** realistic: as often as players choose it; surprise: sidelines more often; hardest: best-scoring popular reply */
  style?: OpponentStyle;
}

export type OpponentStyle = 'realistic' | 'surprise' | 'hardest';

export interface OpponentMove {
  uci: string;
  san: string;
  phase: Exclude<MovePhase, 'player'>;
  games?: number;
  /** Short explanation for the status line */
  reason: string;
}

/**
 * Picks a database move.
 * - realistic: proportional to how often it is played, ignoring moves under 3% so blunders stay rare
 * - surprise: flattened weights (square root) over moves with at least 1%, so sidelines come up often
 * - hardest: among moves with at least 5% share, the one scoring best for the side to move
 */
export function pickWeighted(data: ExplorerData, rand = Math.random, style: OpponentStyle = 'realistic', whiteToMove = true): string | undefined {
  const all = total(data) || data.moves.reduce((s, m) => s + total(m), 0);
  if (style === 'hardest') {
    const pool = data.moves.filter((m) => total(m) >= all * 0.05 && total(m) >= 10);
    const score = (m: ExplorerData['moves'][number]) => ((whiteToMove ? m.white : m.black) + m.draws / 2) / (total(m) || 1);
    return [...pool].sort((a, b) => score(b) - score(a))[0]?.uci ?? data.moves[0]?.uci;
  }
  const minShare = style === 'surprise' ? 0.01 : 0.03;
  const weight = (m: ExplorerData['moves'][number]) => (style === 'surprise' ? Math.sqrt(total(m)) : total(m));
  const pool = data.moves.filter((m) => total(m) >= all * minShare);
  const sum = pool.reduce((s, m) => s + weight(m), 0);
  let r = rand() * sum;
  for (const m of pool) {
    r -= weight(m);
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
          : { source: 'offline', fen, rating: cfg.humanRating },
      );
      const games = total(data);
      if (games >= cfg.humanMinGames) {
        const style = cfg.style ?? 'realistic';
        const uci = pickWeighted(data, Math.random, style, fen.split(' ')[1] === 'w');
        if (uci) {
          const m = data.moves.find((x) => x.uci === uci)!;
          const share = Math.round((total(m) / games) * 100);
          const label = style === 'hardest' ? 'Best-scoring reply' : style === 'surprise' ? 'Surprise choice' : 'Human choice';
          return { uci, san: m.san, phase: 'human', games, reason: `${label}: played in ${share}% of ${games.toLocaleString()} games` };
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
