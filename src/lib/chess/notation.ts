/**
 * Finds chess notation inside prose ("play ...c5, ...Nc6 and ...Qb6", "5...Nxd5?", "Nbd2–f1–g3")
 * and resolves every move to a concrete board position so the UI can preview it on hover.
 *
 * Resolution rules
 * - Side: "N." = White, "N..." / "..." = Black; a bare move directly after another move (only
 *   whitespace between) is the reply by the other side ("...Bxg3 hxg3"); otherwise the context's
 *   default side, falling back to the other side if that is illegal.
 * - Position: numbered moves use the reference line at that ply when given. Other moves continue
 *   from the previous move in the same text ("plans" are played as consecutive moves by one side,
 *   passing the turn when needed), or from the first candidate position where they are legal.
 * - Routes ("Nbd2–f1–g3") play the piece hop by hop and draw every hop as an arrow. A pawn path is
 *   a move only on one file ("e3–e4"); "c3–d4–e3" is a structure and stays plain text.
 * - Bare pawn squares next to words like "the", "on", "pawn", "square" are squares, not moves.
 */
import { parseFen, makeFen } from 'chessops/fen';
import { parseSan } from 'chessops/san';
import { Chess } from 'chessops/chess';
import { parseSquare } from 'chessops/util';
import { stdUci, turnOf, type Ply } from './moves.ts';

export type Side = 'white' | 'black';

export interface NotationContext {
  /** Default side for bare moves (usually the learner's side, or the opponent's in "opponent ideas") */
  side: Side;
  /** Positions to try, in order, when a move doesn't follow from the previous one */
  starts: string[];
  /** Reference line from the initial position, used for numbered moves like "5...Nxd5" */
  line?: Ply[];
}

export interface TextSegment {
  kind: 'text';
  text: string;
}

export interface MoveSegment {
  kind: 'move';
  /** Display text, normalised ("…" for the ellipsis, en dash in routes) */
  text: string;
  /** Position after the move (undefined when it could not be resolved) */
  fen?: string;
  /** Arrows to draw (from, to), one per hop */
  arrows: [string, string][];
  side?: Side;
}

/** A square mentioned in the text ("the e5 pawn", "hits b2"); previewed with the square marked. */
export interface SquareSegment {
  kind: 'square';
  text: string;
  square: string;
  fen: string;
}

export type Segment = TextSegment | MoveSegment | SquareSegment;

const SAN = String.raw`(?:O-O-O|O-O|[KQRBN][a-h]?[1-8]?x?[a-h][1-8]|[a-h]x[a-h][1-8](?:=[QRBN])?|[a-h][1-8](?:=[QRBN])?)[+#]?(?:[!?]{1,2})?`;
const TOKEN = new RegExp(
  String.raw`(?<![\w/.…-])(?<num>\d{1,3}\s?(?:\.\.\.|…|\.)\s?)?(?<ell>\.\.\.|…)?(?<san>${SAN})(?<route>(?:[–—-][a-h][1-8])+)?(?![\w-])`,
  'g',
);

const SQUARE_BEFORE = /\b(the|on|at|to|of|from|into|onto|a|an|its|their|your|his|her|weak|weakened|backward|isolated|passed|outpost|square|squares|towards?)\s*$/i;
const SQUARE_AFTER = /^\s*(pawn|pawns|square|squares|file|outpost|point|knight|bishop|rook|queen|king|diagonal|break|-?pawn|chain|weakness|hole)\b/i;

function flipTurn(fen: string): string | undefined {
  const parts = fen.split(' ');
  parts[1] = parts[1] === 'w' ? 'b' : 'w';
  parts[3] = '-';
  const setup = parseFen(parts.join(' '));
  if (setup.isErr) return undefined;
  const pos = Chess.fromSetup(setup.value);
  return pos.isOk ? makeFen(pos.value.toSetup()) : undefined;
}

interface Played {
  fen: string;
  arrows: [string, string][];
}

/** Plays `san` for `side` from `fen`, passing the turn first if needed. */
function playFor(fen: string, side: Side, san: string): Played | undefined {
  const start = turnOf(fen) === side ? fen : flipTurn(fen);
  if (!start) return undefined;
  const setup = parseFen(start);
  if (setup.isErr) return undefined;
  const p = Chess.fromSetup(setup.value);
  if (p.isErr) return undefined;
  const pos = p.value;
  const m = parseSan(pos, san.replace(/[!?]+$/, ''));
  if (!m) return undefined;
  const uci = stdUci(pos, m);
  pos.play(m);
  return { fen: makeFen(pos.toSetup()), arrows: [[uci.slice(0, 2), uci.slice(2, 4)]] };
}

/** Moves the piece that just arrived on `from` along the remaining route squares. */
function playRoute(fen: string, side: Side, from: string, hops: string[]): Played {
  let cur = fen;
  let at = from;
  const arrows: [string, string][] = [];
  for (const to of hops) {
    arrows.push([at, to]);
    const start = turnOf(cur) === side ? cur : flipTurn(cur);
    if (!start) continue;
    const pos = Chess.fromSetup(parseFen(start).unwrap()).unwrap();
    const f = parseSquare(at);
    const t = parseSquare(to);
    if (f === undefined || t === undefined) continue;
    const move = { from: f, to: t };
    if (pos.isLegal(move)) {
      pos.play(move);
      cur = makeFen(pos.toSetup());
    } else {
      // Blocked in the illustrative position: move the piece anyway so the destination is shown
      const piece = pos.board.take(f);
      if (piece && !pos.board.get(t)) {
        pos.board.set(t, piece);
        cur = makeFen(pos.toSetup());
      }
    }
    at = to;
  }
  return { fen: cur, arrows };
}

function isSquareMention(text: string, start: number, end: number, san: string): boolean {
  if (!/^[a-h][1-8]$/.test(san)) return false;
  return SQUARE_BEFORE.test(text.slice(Math.max(0, start - 14), start)) || SQUARE_AFTER.test(text.slice(end, end + 14));
}

export function parseNotation(text: string, ctx: NotationContext): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  let prevEnd = -10;
  let prevSide: Side | undefined;
  let fen: string | undefined;

  for (const m of text.matchAll(TOKEN)) {
    const g = m.groups!;
    const start = m.index!;
    const end = start + m[0].length;
    const san = g.san;
    const route = g.route ? g.route.slice(1).split(/[–—-]/) : [];

    // Structures like "c3–d4–e3" and diagonals like "h2–b8" are not moves
    const pawnPath = /^[a-h][1-8]$/.test(san) && route.length > 0;
    if (pawnPath && route.some((sq) => sq[0] !== san[0])) continue;
    const bareSquare = !g.num && !g.ell && !route.length && /^[a-h][1-8]$/.test(san);
    const squareSeg = (): SquareSegment => ({ kind: 'square', text: san, square: san, fen: fen ?? ctx.starts[0] });

    if (start > last) out.push({ kind: 'text', text: text.slice(last, start) });

    if (bareSquare && isSquareMention(text, start, end, san)) {
      out.push(squareSeg());
      last = end;
      continue;
    }

    let side: Side;
    let explicit = true;
    if (g.num) side = /\.\.\.|…/.test(g.num) ? 'black' : 'white';
    else if (g.ell) side = 'black';
    else if (prevSide && /^\s*$/.test(text.slice(prevEnd, start))) side = prevSide === 'white' ? 'black' : 'white';
    else {
      side = ctx.side;
      explicit = false;
    }

    // Candidate positions: numbered moves first try the reference line at that ply
    const tries: string[] = [];
    if (g.num && ctx.line) {
      const ply = (parseInt(g.num, 10) - 1) * 2 + (side === 'black' ? 1 : 0);
      const before = ply === 0 ? undefined : ctx.line[ply - 1]?.fen;
      if (before) tries.push(before);
    }
    if (fen) tries.push(fen);
    tries.push(...ctx.starts);

    // A pawn path "e3–e4" is the move to its last square
    const moveSan = pawnPath ? route[route.length - 1] : san;
    let played: Played | undefined;
    let usedSide = side;
    outer: for (const s of explicit ? [side] : [side, side === 'white' ? 'black' : 'white']) {
      for (const f of tries) {
        played = playFor(f, s as Side, moveSan);
        if (played) {
          usedSide = s as Side;
          break outer;
        }
      }
    }

    if (played && route.length && !pawnPath) {
      const r = playRoute(played.fen, usedSide, played.arrows[0][1], route);
      played = { fen: r.fen, arrows: [...played.arrows, ...r.arrows] };
    }

    if (!played && bareSquare) {
      out.push(squareSeg());
      last = end;
      continue;
    }

    const display =
      (g.num ? g.num.replace(/\s/g, '').replace('...', '…') : '') + (g.ell ? '…' : '') + san + (g.route ? g.route.replace(/[—-]/g, '–') : '');
    out.push({ kind: 'move', text: display, fen: played?.fen, arrows: played?.arrows ?? [], side: played ? usedSide : undefined });
    if (played) fen = played.fen;
    prevEnd = end;
    prevSide = played ? usedSide : side;
    last = end;
  }
  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
  return out;
}
