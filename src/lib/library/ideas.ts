import { keyOfFen, playLine } from '../chess/moves.ts';
import { OPENINGS, getOpening } from './index.ts';
import type { LibraryOpening, LibraryTrap } from './types.ts';

interface Index {
  /** position key -> ids of openings whose lines pass through it, with the ply depth of their base */
  members: Map<string, { id: string; baseLen: number; beforeBase: boolean }[]>;
  /** position key -> notes */
  notes: Map<string, { id: string; note: string }[]>;
  /** position key -> traps about to happen from this position */
  traps: Map<string, { id: string; trap: LibraryTrap }[]>;
  /** position key -> names of lines reaching this position at their leaf */
  lineEnds: Map<string, string[]>;
}

let index: Index | null = null;

function push<T>(m: Map<string, T[]>, k: string, v: T) {
  const a = m.get(k);
  if (a) a.push(v);
  else m.set(k, [v]);
}

function build(): Index {
  const idx: Index = { members: new Map(), notes: new Map(), traps: new Map(), lineEnds: new Map() };
  for (const o of OPENINGS) {
    const baseLen = playLine(o.base).length;
    const seen = new Set<string>();
    for (const l of o.lines) {
      const plies = playLine(l.moves);
      plies.forEach((p, i) => {
        const k = keyOfFen(p.fen);
        if (!seen.has(k)) {
          seen.add(k);
          push(idx.members, k, { id: o.id, baseLen, beforeBase: i + 1 < baseLen });
        }
      });
      if (plies.length) push(idx.lineEnds, keyOfFen(plies[plies.length - 1].fen), l.name);
    }
    for (const n of o.positions) {
      const plies = playLine(n.moves);
      if (plies.length) push(idx.notes, keyOfFen(plies[plies.length - 1].fen), { id: o.id, note: n.note });
    }
    for (const t of o.traps) {
      const plies = playLine(t.moves);
      // Warn only in the last few positions before the trap springs, not from move one
      plies.forEach((p, i) => {
        if (i >= plies.length - 5 && i < plies.length - 1) push(idx.traps, keyOfFen(p.fen), { id: o.id, trap: t });
      });
    }
  }
  return idx;
}

export interface IdeasContext {
  opening?: LibraryOpening;
  notes: string[];
  traps: LibraryTrap[];
  lineNames: string[];
}

/**
 * Figures out which library opening the current game belongs to (transpositions included) and
 * collects the notes attached to the current position.
 * @param fens positions after each move, newest last (not including the start position)
 */
export function ideasFor(fens: string[], preferred?: string): IdeasContext {
  index ??= build();
  const keys = fens.map(keyOfFen);
  let opening: LibraryOpening | undefined;
  if (preferred && keys.some((k) => index!.members.get(k)?.some((m) => m.id === preferred))) opening = getOpening(preferred);
  if (!opening) {
    for (let i = keys.length - 1; i >= 0 && !opening; i--) {
      const ms = index.members.get(keys[i]);
      const real = ms?.filter((m) => !m.beforeBase);
      if (real?.length) opening = getOpening([...real].sort((a, b) => b.baseLen - a.baseLen)[0].id);
    }
  }
  const cur = keys[keys.length - 1];
  const notes = cur ? (index.notes.get(cur) ?? []).map((n) => n.note) : [];
  const traps = cur ? (index.traps.get(cur) ?? []).map((t) => t.trap) : [];
  const lineNames = cur ? (index.lineEnds.get(cur) ?? []) : [];
  return { opening, notes: [...new Set(notes)], traps: [...new Set(traps)], lineNames };
}

/** Library openings whose lines contain this position. */
export function openingsAt(fen: string): LibraryOpening[] {
  index ??= build();
  return (index.members.get(keyOfFen(fen)) ?? []).filter((m) => !m.beforeBase).map((m) => getOpening(m.id)!).filter(Boolean);
}
