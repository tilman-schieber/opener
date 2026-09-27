import { INITIAL_FEN, playLine, type Ply } from '../chess/moves.ts';
import type { NotationContext } from '../chess/notation.ts';
import type { LibraryOpening, Side } from './types.ts';

const cache = new Map<string, { line: Ply[]; starts: string[] }>();

function base(o: LibraryOpening) {
  let c = cache.get(o.id);
  if (!c) {
    const line = playLine(o.lines[0].moves);
    const baseLen = playLine(o.base).length;
    const others = o.lines.slice(1).flatMap((l) => playLine(l.moves).slice(baseLen).map((p) => p.fen));
    const starts = [line[baseLen - 1]?.fen ?? INITIAL_FEN, ...line.slice(baseLen).map((p) => p.fen), ...others, ...line.slice(0, baseLen).map((p) => p.fen), INITIAL_FEN];
    c = { line, starts };
    cache.set(o.id, c);
  }
  return c;
}

/**
 * Notation context for an opening's prose: moves resolve against the current board first (if any),
 * then the opening's main line, then its other lines.
 */
export function openingContext(o: LibraryOpening, opts: { side?: Side; current?: string; line?: Ply[] } = {}): NotationContext {
  const b = base(o);
  return {
    side: opts.side ?? o.side,
    starts: opts.current ? [opts.current, ...b.starts] : b.starts,
    line: opts.line ?? b.line,
  };
}

/** Context for a trap explanation: its own move sequence is the reference line. */
export function trapContext(o: LibraryOpening, moves: string): NotationContext {
  const line = playLine(moves);
  return { side: o.side, starts: [...line.map((p) => p.fen).reverse(), ...base(o).starts], line };
}
