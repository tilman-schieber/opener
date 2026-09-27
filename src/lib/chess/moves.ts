import { Chess, castlingSide, normalizeMove, type Position } from 'chessops/chess';
import type { Move } from 'chessops/types';
import { parseFen, makeFen, INITIAL_FEN } from 'chessops/fen';
import { parseSan, makeSan } from 'chessops/san';
import { parseUci, makeUci, makeSquare, squareFile, squareRank } from 'chessops/util';
import { chessgroundDests } from 'chessops/compat';
import { fenKey } from './key.ts';

/** Splits "1. e4 e5 2. Nf3 Nc6 3...Bc5" into SAN tokens, dropping move numbers, results and annotations. */
export function tokenizeMoves(moves: string): string[] {
  return moves
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\d+(\.\.\.|\.|…)/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/[?!]+$/, ''))
    .filter((t) => t && t !== '*' && t !== '1-0' && t !== '0-1' && t !== '1/2-1/2');
}


export { INITIAL_FEN };

/** UCI with castling written king-to-destination (e1g1), as Lichess and Stockfish expect. */
export function stdUci(pos: Position, move: Move): string {
  if ('from' in move) {
    const side = castlingSide(pos, move);
    if (side) {
      const rank = squareRank(move.from);
      return makeSquare(move.from) + makeSquare(rank * 8 + (side === 'h' ? 6 : 2));
    }
  }
  return makeUci(move);
}

/** Parses any UCI (standard or king-takes-rook castling) into a legal move for `pos`. */
export function parseMove(pos: Position, uci: string): Move | undefined {
  const m = parseUci(uci);
  if (!m) return undefined;
  const n = normalizeMove(pos, m);
  return pos.isLegal(n) ? n : undefined;
}

/** Normalizes a UCI string to standard form in the given position. */
export function normalizeUci(fen: string, uci: string): string {
  const pos = posFromFen(fen);
  const m = parseMove(pos, uci);
  return m ? stdUci(pos, m) : uci;
}

export interface Ply {
  san: string;
  uci: string;
  /** FEN after the move */
  fen: string;
}

export function posFromFen(fen: string): Chess {
  return Chess.fromSetup(parseFen(fen).unwrap()).unwrap();
}

export function fenOf(pos: Position): string {
  return makeFen(pos.toSetup());
}

/** Plays SAN moves from the start (or `fen`), stopping at the first illegal one. */
export function playSans(sans: string[], fen = INITIAL_FEN): Ply[] {
  const pos = posFromFen(fen);
  const out: Ply[] = [];
  for (const san of sans) {
    const m = parseSan(pos, san);
    if (!m) break;
    const norm = makeSan(pos, m);
    const uci = stdUci(pos, m);
    pos.play(m);
    out.push({ san: norm, uci, fen: fenOf(pos) });
  }
  return out;
}

export function playLine(moves: string, fen = INITIAL_FEN): Ply[] {
  return playSans(tokenizeMoves(moves), fen);
}

/** Plays one UCI move on `fen`; returns undefined when illegal. */
export function playUci(fen: string, uci: string): Ply | undefined {
  const pos = posFromFen(fen);
  const m = parseMove(pos, uci);
  if (!m) return undefined;
  const san = makeSan(pos, m);
  const std = stdUci(pos, m);
  pos.play(m);
  return { san, uci: std, fen: fenOf(pos) };
}

export function uciToSan(fen: string, uci: string): string {
  const pos = posFromFen(fen);
  const m = parseMove(pos, uci);
  return m ? makeSan(pos, m) : uci;
}

export function sanToUci(fen: string, san: string): string | undefined {
  const pos = posFromFen(fen);
  const m = parseSan(pos, san);
  return m ? stdUci(pos, m) : undefined;
}

export function destsOf(fen: string) {
  return chessgroundDests(posFromFen(fen));
}

export function keyOfFen(fen: string): string {
  return fenKey(posFromFen(fen));
}

export function turnOf(fen: string): 'white' | 'black' {
  return fen.split(' ')[1] === 'b' ? 'black' : 'white';
}

export interface Outcome {
  over: boolean;
  winner?: 'white' | 'black';
  reason?: 'checkmate' | 'stalemate' | 'insufficient' | 'threefold' | 'fifty-move';
}

export function outcomeOf(fen: string, history: string[] = []): Outcome {
  const pos = posFromFen(fen);
  if (pos.isCheckmate()) return { over: true, winner: pos.turn === 'white' ? 'black' : 'white', reason: 'checkmate' };
  if (pos.isStalemate()) return { over: true, reason: 'stalemate' };
  if (pos.isInsufficientMaterial()) return { over: true, reason: 'insufficient' };
  if (pos.halfmoves >= 100) return { over: true, reason: 'fifty-move' };
  const k = fenKey(pos);
  if (history.filter((f) => keyOfFen(f) === k).length >= 3) return { over: true, reason: 'threefold' };
  return { over: false };
}

export function isCheck(fen: string): boolean {
  return posFromFen(fen).isCheck();
}

/** "1. e4 e5 2. Nf3" style rendering of plies, starting at ply index `from` (0 = White's first move). */
export function formatLine(sans: string[], from = 0): string {
  let out = '';
  sans.forEach((san, i) => {
    const ply = from + i;
    if (ply % 2 === 0) out += `${ply / 2 + 1}. `;
    else if (i === 0) out += `${(ply + 1) / 2}… `;
    out += san + ' ';
  });
  return out.trim();
}
