import { INITIAL_FEN, playLine, playSans, playUci, keyOfFen, tokenizeMoves } from '../chess/moves.ts';
import type { Side } from '../library/types.ts';
import { OPENINGS, getOpening } from '../library/index.ts';

export interface RepNode {
  san: string;
  uci: string;
  children: RepNode[];
  comment?: string;
  /** Name of the line ending here (from library or import) */
  name?: string;
}

export interface Repertoire {
  id: string;
  name: string;
  color: Side;
  origin: 'library' | 'custom' | 'import';
  /** Library opening this repertoire is based on (enables key ideas) */
  libraryId?: string;
  root: RepNode;
  /** User notes by position key */
  notes: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}

export interface RepLine {
  /** SAN moves from the start */
  sans: string[];
  ucis: string[];
  name?: string;
  /** Stable id: repertoire id + uci path */
  key: string;
}

export function emptyRoot(): RepNode {
  return { san: '', uci: '', children: [] };
}

/** Adds a SAN line to the tree; returns true if anything new was added. */
export function addLine(root: RepNode, sans: string[], name?: string, comments?: (string | undefined)[]): boolean {
  const plies = playSans(sans);
  let node = root;
  let added = false;
  plies.forEach((p, i) => {
    let child = node.children.find((c) => c.uci === p.uci);
    if (!child) {
      child = { san: p.san, uci: p.uci, children: [] };
      node.children.push(child);
      added = true;
    }
    if (comments?.[i] && !child.comment) child.comment = comments[i];
    node = child;
  });
  if (name && !node.name && node.children.length === 0) node.name = name;
  return added;
}

/** Removes the node reached by `ucis` (and everything below it). */
export function removeAt(root: RepNode, ucis: string[]): void {
  if (!ucis.length) return;
  const parent = nodeAt(root, ucis.slice(0, -1));
  if (parent) parent.children = parent.children.filter((c) => c.uci !== ucis[ucis.length - 1]);
}

export function nodeAt(root: RepNode, ucis: string[]): RepNode | undefined {
  let node: RepNode | undefined = root;
  for (const u of ucis) {
    node = node?.children.find((c) => c.uci === u);
    if (!node) return undefined;
  }
  return node;
}

/** All root-to-leaf lines. */
export function linesOf(rep: Pick<Repertoire, 'id' | 'root'>): RepLine[] {
  const out: RepLine[] = [];
  const walk = (node: RepNode, sans: string[], ucis: string[], name?: string) => {
    if (!node.children.length) {
      if (sans.length) out.push({ sans, ucis, name: node.name ?? name, key: `${rep.id}:${ucis.join(' ')}` });
      return;
    }
    for (const c of node.children) walk(c, [...sans, c.san], [...ucis, c.uci], c.name ?? name);
  };
  walk(rep.root, [], []);
  return out;
}

export function countLines(root: RepNode): number {
  return root.children.length ? root.children.reduce((s, c) => s + countLines(c), 0) : 1;
}

/**
 * Position index: for every position in the repertoire, the moves the tree continues with.
 * Keyed by transposition-safe position key so move-order tricks still count as "in book".
 */
export function positionIndex(root: RepNode): Map<string, RepNode[]> {
  const idx = new Map<string, RepNode[]>();
  const walk = (node: RepNode, fen: string) => {
    if (!node.children.length) return;
    const k = keyOfFen(fen);
    const list = idx.get(k) ?? [];
    for (const c of node.children) if (!list.some((x) => x.uci === c.uci)) list.push(c);
    idx.set(k, list);
    for (const c of node.children) {
      const p = playUci(fen, c.uci);
      if (p) walk(c, p.fen);
    }
  };
  walk(root, INITIAL_FEN);
  return idx;
}

/** Library openings exposed as read-only repertoires. */
export function libraryRepertoire(id: string): Repertoire | undefined {
  const o = getOpening(id);
  if (!o) return undefined;
  const root = emptyRoot();
  for (const l of o.lines) addLine(root, tokenizeMoves(l.moves), l.name);
  return { id: `lib:${o.id}`, name: o.name, color: o.side, origin: 'library', libraryId: o.id, root, notes: {}, createdAt: 0, updatedAt: 0 };
}

export function allLibraryRepertoires(): Repertoire[] {
  return OPENINGS.map((o) => libraryRepertoire(o.id)!);
}

export function lineFromMoves(moves: string) {
  return playLine(moves);
}
