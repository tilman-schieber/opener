import { getAnalysisEngine, winPercent } from '../engine/engine.ts';
import { INITIAL_FEN, keyOfFen, outcomeOf, uciToSan } from '../chess/moves.ts';
import { db, type CachedEval } from '../store/db.ts';
import type { PlayedMove } from '../play/types.ts';
import type { Judgement, ReviewData } from './types.ts';

type Eval = { cp?: number; mate?: number; best?: string };

/**
 * Evaluates a position at least `depth` deep, reusing a stored evaluation when one exists. Opening
 * positions repeat across games, so after a few reviews most book plies cost nothing.
 */
export async function evaluate(fen: string, depth: number): Promise<Eval> {
  const key = keyOfFen(fen);
  const store = await db().catch(() => null);
  const hit = store ? await store.get('evals', key).catch(() => undefined) : undefined;
  if (hit && hit.depth >= depth) return { cp: hit.cp, mate: hit.mate, best: hit.best };
  const a = await getAnalysisEngine().go(fen, { depth });
  const l = a.lines[0];
  const e: Eval = l ? { cp: l.cp, mate: l.mate, best: a.bestmove } : { best: a.bestmove };
  if (store && l) {
    const row: CachedEval = { key, depth: a.depth || depth, cp: e.cp, mate: e.mate, best: e.best, at: Date.now() };
    store.put('evals', row).catch(() => {});
  }
  return e;
}

/** Lichess thresholds on winning chances (converted from [-1, 1] to percentage points). */
export function judge(loss: number): Judgement | undefined {
  if (loss >= 15) return 'blunder';
  if (loss >= 10) return 'mistake';
  if (loss >= 5) return 'inaccuracy';
  return undefined;
}

export async function analyseGame(moves: PlayedMove[], depth: number, onProgress: (done: number, total: number) => void): Promise<ReviewData> {
  const fens = [INITIAL_FEN, ...moves.map((m) => m.fen)];
  const evals: Eval[] = [];
  for (let i = 0; i < fens.length; i++) {
    evals.push(await evaluate(fens[i], depth));
    onProgress(i + 1, fens.length);
  }
  // A position with no legal moves has no engine line; fill in from the game result
  for (let i = 0; i < evals.length; i++) {
    if (evals[i].cp === undefined && evals[i].mate === undefined) {
      const o = outcomeOf(fens[i]);
      evals[i] = o.winner ? { mate: o.winner === 'white' ? 1 : -1 } : { cp: 0 };
    }
  }
  const plies = moves.map((m, i) => {
    const before = winPercent(evals[i]);
    const after = winPercent(evals[i + 1]);
    const whiteMoved = i % 2 === 0;
    const loss = Math.max(0, whiteMoved ? before - after : after - before);
    const best = evals[i].best;
    const playedBest = best === m.uci;
    return {
      cp: evals[i + 1].cp,
      mate: evals[i + 1].mate,
      best,
      bestSan: best ? uciToSan(fens[i], best) : undefined,
      loss: playedBest ? 0 : loss,
      judgement: playedBest ? undefined : judge(loss),
    };
  });
  return { depth, start: { cp: evals[0].cp, mate: evals[0].mate }, plies };
}
