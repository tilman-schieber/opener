import { getAnalysisEngine, winPercent } from '../engine/engine.ts';
import { INITIAL_FEN, outcomeOf, uciToSan } from '../chess/moves.ts';
import type { PlayedMove } from '../play/types.ts';
import type { Judgement, ReviewData } from './types.ts';

/** Lichess thresholds on winning chances (converted from [-1, 1] to percentage points). */
export function judge(loss: number): Judgement | undefined {
  if (loss >= 15) return 'blunder';
  if (loss >= 10) return 'mistake';
  if (loss >= 5) return 'inaccuracy';
  return undefined;
}

export async function analyseGame(moves: PlayedMove[], depth: number, onProgress: (done: number, total: number) => void): Promise<ReviewData> {
  const engine = getAnalysisEngine();
  const fens = [INITIAL_FEN, ...moves.map((m) => m.fen)];
  const evals: { cp?: number; mate?: number; best?: string }[] = [];
  for (let i = 0; i < fens.length; i++) {
    const a = await engine.go(fens[i], { depth });
    const l = a.lines[0];
    evals.push(l ? { cp: l.cp, mate: l.mate, best: a.bestmove } : { best: a.bestmove });
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
