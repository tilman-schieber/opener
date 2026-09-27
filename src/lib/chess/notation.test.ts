import { describe, it, expect } from 'vitest';
import { parseNotation, type MoveSegment } from './notation.ts';
import { playLine, INITIAL_FEN } from './moves.ts';

const moves = (segs: ReturnType<typeof parseNotation>) => segs.filter((s): s is MoveSegment => s.kind === 'move');

describe('notation in prose', () => {
  const london = playLine('1. d4 d5 2. Bf4 Nf6 3. e3 e6 4. Nf3 c5 5. c3 Nc6 6. Nbd2 Bd6 7. Bg3 O-O 8. Bd3');
  const ctx = { side: 'white' as const, starts: [london[0].fen, ...london.map((p) => p.fen)], line: london };

  it('finds a plan of one side and resolves each move', () => {
    const m = moves(parseNotation('Classic attacking plan: Ne5, f4, Qf3 and a rook lift.', ctx));
    expect(m.map((x) => x.text)).toEqual(['Ne5', 'f4', 'Qf3']);
    expect(m.every((x) => x.fen)).toBe(true);
    expect(m[2].arrows).toEqual([['d1', 'f3']]);
  });

  it('alternates sides for adjacent moves and honours the ellipsis', () => {
    const m = moves(parseNotation('after ...Bxg3 hxg3 the half-open h-file helps', ctx));
    expect(m.map((x) => [x.text, x.side])).toEqual([['…Bxg3', 'black'], ['hxg3', 'white']]);
    expect(m[1].fen).toBeDefined();
  });

  it('uses the reference line for numbered moves', () => {
    const m = moves(parseNotation('Play 2.Bf4 early (before e3)', ctx));
    expect(m[0].text).toBe('2.Bf4');
    expect(m[0].arrows).toEqual([['c1', 'f4']]);
  });

  it('keeps structures and square mentions as text', () => {
    const segs = parseNotation("keep the pyramid c3–d4–e3 on the h2–b8 diagonal; the e5 pawn cramps you", ctx);
    expect(moves(segs)).toEqual([]);
    expect(segs.filter((s) => s.kind === 'square').map((s) => s.text)).toEqual(['e5']);
  });

  it('plays routes hop by hop', () => {
    const it = playLine('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 d6 6. O-O a6 7. a4 O-O 8. Re1 Ba7 9. h3 h6');
    const m = moves(parseNotation('Reroute the knight via Nbd2–f1–g3 toward f5.', { side: 'white', starts: [it[it.length - 1].fen] }));
    expect(m).toHaveLength(1);
    expect(m[0].text).toBe('Nbd2–f1–g3');
    expect(m[0].arrows).toEqual([['b1', 'd2'], ['d2', 'f1'], ['f1', 'g3']]);
  });

  it('treats a same-file pawn path as a pawn move', () => {
    const m = moves(parseNotation('break with e3–e4', { side: 'white', starts: [london[london.length - 1].fen] }));
    expect(m[0].arrows).toEqual([['e3', 'e4']]);
  });

  it('falls back to the other side and marks unplayable moves', () => {
    const m = moves(parseNotation('White plays Qh8 here', { side: 'black', starts: [INITIAL_FEN] }));
    expect(m[0].fen).toBeUndefined();
  });
});
