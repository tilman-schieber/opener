import { describe, it, expect } from 'vitest';
import { Chess } from 'chessops/chess';
import { parseSan } from 'chessops/san';
import { OPENINGS } from './index.ts';
import { tokenizeMoves } from '../chess/moves.ts';

function playable(moves: string): string | null {
  const pos = Chess.default();
  for (const san of tokenizeMoves(moves)) {
    const m = parseSan(pos, san);
    if (!m) return `illegal move "${san}" in "${moves}"`;
    pos.play(m);
  }
  return null;
}

describe('library', () => {
  it('has unique ids', () => {
    const ids = OPENINGS.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  for (const o of OPENINGS) {
    describe(o.id, () => {
      it('all move sequences are legal', () => {
        const errs: string[] = [];
        for (const s of [o.base, ...o.lines.map((l) => l.moves), ...o.traps.map((t) => t.moves), ...o.positions.map((p) => p.moves)]) {
          const e = playable(s);
          if (e) errs.push(e);
        }
        expect(errs).toEqual([]);
      });
      it('lines start with the base moves', () => {
        const base = tokenizeMoves(o.base).join(' ');
        for (const l of o.lines) expect(tokenizeMoves(l.moves).join(' ').startsWith(base), l.name).toBe(true);
      });
      it('has content', () => {
        expect(o.lines.length).toBeGreaterThanOrEqual(3);
        expect(o.ideas.length).toBeGreaterThanOrEqual(4);
      });
    });
  }
});
