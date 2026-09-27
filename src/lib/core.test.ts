import { describe, it, expect } from 'vitest';
import { playLine, playUci, normalizeUci, keyOfFen, INITIAL_FEN, outcomeOf, tokenizeMoves, formatLine } from './chess/moves.ts';
import { addLine, emptyRoot, linesOf, positionIndex, removeAt, countLines } from './repertoire/model.ts';
import { repertoireFromPgn } from './repertoire/importPgn.ts';
import { pickWeighted } from './play/opponent.ts';
import { weakness, pickLine, lineStatus } from './drill/stats.ts';
import { treeHash, fenKey } from './chess/key.ts';
import { judge } from './review/analyse.ts';
import { Chess } from 'chessops/chess';

describe('moves', () => {
  it('uses king-to-destination castling UCI', () => {
    const plies = playLine('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. O-O');
    expect(plies[6].uci).toBe('e1g1');
    const before = plies[5].fen;
    expect(normalizeUci(before, 'e1h1')).toBe('e1g1');
    expect(playUci(before, 'e1g1')?.san).toBe('O-O');
    expect(playUci(before, 'e1h1')?.san).toBe('O-O');
  });
  it('tokenizes move text with numbers, ellipses and annotations', () => {
    expect(tokenizeMoves('1. e4 e5 2. Nf3?! Nc6 3...Bc5 {comment} 4.c3!')).toEqual(['e4', 'e5', 'Nf3', 'Nc6', 'Bc5', 'c3']);
  });
  it('formats lines with move numbers', () => {
    expect(formatLine(['e4', 'e5', 'Nf3'])).toBe('1. e4 e5 2. Nf3');
    expect(formatLine(['e5', 'Nf3'], 1)).toBe('1… e5 2. Nf3');
  });
  it('detects transpositions by position key', () => {
    const a = playLine('1. d4 Nf6 2. c4 e6');
    const b = playLine('1. c4 e6 2. d4 Nf6');
    expect(keyOfFen(a[3].fen)).toBe(keyOfFen(b[3].fen));
  });
  it('drops an en passant square that cannot be captured', () => {
    const p = playLine('1. e4');
    expect(keyOfFen(p[0].fen).split(' ')[3]).toBe('-');
  });
  it('recognises checkmate and threefold', () => {
    const mate = playLine('1. f3 e5 2. g4 Qh4#');
    expect(outcomeOf(mate[3].fen)).toMatchObject({ over: true, winner: 'black', reason: 'checkmate' });
    const rep = playLine('1. Nf3 Nf6 2. Ng1 Ng8 3. Nf3 Nf6 4. Ng1 Ng8');
    expect(outcomeOf(rep[7].fen, [INITIAL_FEN, ...rep.map((p) => p.fen)]).reason).toBe('threefold');
  });
  it('has a stable tree hash', () => {
    const k = fenKey(Chess.default());
    expect(treeHash(k)).toMatch(/^[0-9a-f]{12}$/);
    expect(treeHash(k)).toBe(treeHash(k));
  });
});

describe('repertoire', () => {
  it('builds a tree, lists lines, indexes positions and removes branches', () => {
    const root = emptyRoot();
    expect(addLine(root, ['e4', 'e5', 'Nf3'], 'A')).toBe(true);
    expect(addLine(root, ['e4', 'c5', 'Nf3'], 'B')).toBe(true);
    expect(addLine(root, ['e4', 'e5'])).toBe(false);
    const lines = linesOf({ id: 'r', root });
    expect(lines.map((l) => l.sans.join(' '))).toEqual(['e4 e5 Nf3', 'e4 c5 Nf3']);
    expect(lines[0].name).toBe('A');
    const idx = positionIndex(root);
    expect(idx.get(keyOfFen(playLine('1. e4')[0].fen))!.map((n) => n.san).sort()).toEqual(['c5', 'e5']);
    removeAt(root, ['e2e4', 'c7c5']);
    expect(countLines(root)).toBe(1);
  });
  it('imports PGN variations and comments', () => {
    const pgn = `[Event "Test"]\n[ChapterName "Italian"]\n\n1. e4 e5 2. Nf3 { develop } Nc6 (2... d6 3. d4) 3. Bc4 *`;
    const r = repertoireFromPgn(pgn);
    expect(r.lines).toBe(2);
    expect(r.chapters).toEqual(['Italian']);
    const nf3 = r.root.children[0].children[0].children[0];
    expect(nf3.san).toBe('Nf3');
    expect(nf3.comment).toBe('develop');
  });
});

describe('opponent', () => {
  const data = {
    source: 'offline' as const,
    white: 60,
    draws: 20,
    black: 20,
    moves: [
      { uci: 'e2e4', san: 'e4', white: 50, draws: 10, black: 10 },
      { uci: 'd2d4', san: 'd4', white: 9, draws: 9, black: 9 },
      { uci: 'g2g4', san: 'g4', white: 1, draws: 0, black: 1 },
    ],
  };
  it('picks proportionally and ignores rare moves', () => {
    expect(pickWeighted(data, () => 0)).toBe('e2e4');
    expect(pickWeighted(data, () => 0.999)).toBe('d2d4');
    const counts: Record<string, number> = {};
    for (let i = 0; i < 2000; i++) {
      const m = pickWeighted(data)!;
      counts[m] = (counts[m] ?? 0) + 1;
    }
    expect(counts['g2g4']).toBeUndefined();
    expect(counts['e2e4']).toBeGreaterThan(counts['d2d4']);
  });
  it('supports surprise and hardest styles', () => {
    // hardest: best score for White among popular moves (d4 scores 50%, e4 scores ~79%)
    expect(pickWeighted(data, Math.random, 'hardest', true)).toBe('e2e4');
    expect(pickWeighted(data, Math.random, 'hardest', false)).toBe('d2d4');
    // surprise lets the 2% move in and flattens the weights
    const counts: Record<string, number> = {};
    for (let i = 0; i < 3000; i++) {
      const m = pickWeighted(data, Math.random, 'surprise')!;
      counts[m] = (counts[m] ?? 0) + 1;
    }
    expect(counts['g2g4']).toBeGreaterThan(0);
    expect(counts['d2d4'] / counts['e2e4']).toBeGreaterThan(0.45);
  });
});

describe('drill', () => {
  it('prefers new and weak lines', () => {
    const now = Date.now();
    const solid = { key: 'a', attempts: 5, fails: 0, streak: 5, lastSeen: now, mistakes: {} };
    const weak = { key: 'b', attempts: 3, fails: 2, streak: 0, lastSeen: now, mistakes: {} };
    expect(weakness(undefined)).toBeGreaterThan(weakness(weak));
    expect(weakness(weak)).toBeGreaterThan(weakness(solid) * 5);
    expect(lineStatus(solid)).toBe('solid');
    expect(lineStatus(weak)).toBe('weak');
    const lines = [{ key: 'a', sans: [], ucis: [] }, { key: 'b', sans: [], ucis: [] }];
    const stats = new Map([['a', solid], ['b', weak]]);
    let b = 0;
    for (let i = 0; i < 500; i++) if (pickLine(lines, stats).key === 'b') b++;
    expect(b).toBeGreaterThan(400);
  });
});

describe('review', () => {
  it('uses Lichess thresholds', () => {
    expect(judge(3)).toBeUndefined();
    expect(judge(6)).toBe('inaccuracy');
    expect(judge(12)).toBe('mistake');
    expect(judge(40)).toBe('blunder');
  });
});
