import type { Position } from 'chessops/chess';
import { makeFen } from 'chessops/fen';

/** FEN without move counters, en passant only when a capture is legal. Transposition-safe. */
export function fenKey(pos: Position): string {
  return makeFen(pos.toSetup()).split(' ').slice(0, 4).join(' ');
}

/** Same as fenKey but starting from a full FEN string (assumes ep already normalized). */
export function fenKeyFromFen(fen: string): string {
  return fen.split(' ').slice(0, 4).join(' ');
}

function fnv1a(str: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** 48-bit hex hash of a fenKey, used as the id in the bundled offline tree. First two chars pick the shard. */
export function treeHash(key: string): string {
  const a = fnv1a(key, 0x811c9dc5).toString(16).padStart(8, '0');
  const b = fnv1a(key, 0x2c1b3c6d).toString(16).padStart(8, '0');
  return a + b.slice(0, 4);
}
