import { INITIAL_FEN, playLine, type Ply } from '../chess/moves.ts';
import type { LibraryOpening, Side } from './types.ts';

/**
 * The library as a move tree: every opening hangs from the position where its base moves end, so
 * gambits and sidelines sit under their parent openings (Stafford under the Petrov, Smith-Morra under
 * the Sicilian). Stretches of moves without an opening of their own are collapsed into one step.
 */
export interface TreeNode {
  /** Unique id: the UCI moves from the start */
  id: string;
  /** All plies from the start position to this node */
  path: Ply[];
  /** The plies this node adds to its parent (a collapsed stretch can have several) */
  segment: Ply[];
  fen: string;
  /** Library openings whose base ends exactly here */
  items: LibraryOpening[];
  children: TreeNode[];
}

interface Trie {
  ply?: Ply;
  items: LibraryOpening[];
  kids: Map<string, Trie>;
}

export function buildOpeningTree(openings: LibraryOpening[]): TreeNode {
  const root: Trie = { items: [], kids: new Map() };
  for (const o of openings) {
    let t = root;
    for (const p of playLine(o.base)) {
      let k = t.kids.get(p.uci);
      if (!k) t.kids.set(p.uci, (k = { ply: p, items: [], kids: new Map() }));
      t = k;
    }
    t.items.push(o);
  }

  const convert = (t: Trie, parentPath: Ply[]): TreeNode => {
    const segment: Ply[] = t.ply ? [t.ply] : [];
    let cur = t;
    // Collapse: a node with no opening and a single continuation merges into it
    while (cur !== root && !cur.items.length && cur.kids.size === 1) {
      cur = [...cur.kids.values()][0];
      segment.push(cur.ply!);
    }
    const path = [...parentPath, ...segment];
    const children = [...cur.kids.values()].map((k) => convert(k, path));
    children.sort((a, b) => count(b) - count(a) || a.segment[0].san.localeCompare(b.segment[0].san));
    return {
      id: path.map((p) => p.uci).join(' ') || 'root',
      path,
      segment,
      fen: path.length ? path[path.length - 1].fen : INITIAL_FEN,
      items: [...cur.items].sort((a, b) => a.name.localeCompare(b.name)),
      children,
    };
  };
  return convert(root, []);
}

/** Number of openings in a subtree. */
export function count(n: TreeNode, side?: Side): number {
  return n.items.filter((o) => !side || o.side === side).length + n.children.reduce((s, c) => s + count(c, side), 0);
}

/** Copy of the tree keeping only openings that match `keep`; empty branches are dropped. */
export function filterTree(n: TreeNode, keep: (o: LibraryOpening) => boolean): TreeNode | null {
  const items = n.items.filter(keep);
  const children = n.children.map((c) => filterTree(c, keep)).filter((c): c is TreeNode => !!c);
  if (!items.length && !children.length && n.id !== 'root') return null;
  return { ...n, items, children };
}

/** Chain of nodes from the root to the node where `openingId` sits (root excluded). */
export function pathTo(root: TreeNode, openingId: string): TreeNode[] {
  const walk = (n: TreeNode, acc: TreeNode[]): TreeNode[] | null => {
    const here = n.id === 'root' ? acc : [...acc, n];
    if (n.items.some((o) => o.id === openingId)) return here;
    for (const c of n.children) {
      const r = walk(c, here);
      if (r) return r;
    }
    return null;
  };
  return walk(root, []) ?? [];
}

/** All openings below a node (not including the node's own items). */
export function descendants(n: TreeNode): LibraryOpening[] {
  return n.children.flatMap((c) => [...c.items, ...descendants(c)]);
}

/** "3.Bb5" / "3…f5" / "2.Nf3 d6 3.d4" style label for a node's segment. */
export function segmentLabel(n: TreeNode): string {
  const start = n.path.length - n.segment.length;
  return n.segment
    .map((p, i) => {
      const ply = start + i;
      const num = ply % 2 === 0 ? `${ply / 2 + 1}.` : i === 0 ? `${Math.floor(ply / 2) + 1}…` : '';
      return num + p.san;
    })
    .join(' ');
}
