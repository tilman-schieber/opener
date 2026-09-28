import { describe, it, expect } from 'vitest';
import { OPENINGS } from './index.ts';
import { buildOpeningTree, count, filterTree, pathTo, descendants, segmentLabel, type TreeNode } from './tree.ts';

const tree = buildOpeningTree(OPENINGS);
const find = (n: TreeNode, label: string): TreeNode | undefined => (segmentLabel(n) === label ? n : n.children.map((c) => find(c, label)).find(Boolean));

describe('opening tree', () => {
  it('contains every opening exactly once', () => {
    expect(count(tree)).toBe(OPENINGS.length);
  });
  it('puts gambits under their parent openings', () => {
    expect(pathTo(tree, 'stafford-gambit').map((n) => n.items.map((o) => o.id)).flat()).toContain('petrov-defense');
    expect(pathTo(tree, 'schliemann-gambit').map((n) => n.items.map((o) => o.id)).flat()).toContain('ruy-lopez');
    const sicilian = find(tree.children.find((c) => segmentLabel(c) === '1.e4')!, '1…c5')!;
    const below = descendants(sicilian).map((o) => o.id);
    for (const id of ['smith-morra', 'sicilian-najdorf', 'sicilian-dragon', 'accelerated-dragon', 'sicilian-sveshnikov']) expect(below).toContain(id);
  });
  it('collapses move stretches without openings', () => {
    const d4 = tree.children.find((c) => segmentLabel(c) === '1.d4')!;
    const d5 = find(d4, '1…d5')!;
    expect(d5.children.map(segmentLabel)).toContain('2.e4 dxe4 3.Nc3 Nf6 4.f3');
  });
  it('filters by side and prunes empty branches', () => {
    const white = filterTree(tree, (o) => o.side === 'white')!;
    expect(count(white)).toBe(OPENINGS.filter((o) => o.side === 'white').length);
    expect(count(white, 'black')).toBe(0);
  });
});
