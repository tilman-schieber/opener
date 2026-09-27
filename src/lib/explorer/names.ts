import { keyOfFen } from '../chess/moves.ts';

type NameTable = Record<string, [eco: string, name: string, pgn: string]>;

let table: NameTable | null = null;
let loading: Promise<NameTable> | null = null;

/** Loads the ECO name table (lichess-org/chess-openings, CC0). */
export function loadNames(): Promise<NameTable> {
  if (table) return Promise.resolve(table);
  loading ??= fetch(`${import.meta.env.BASE_URL}openings.json`)
    .then((r) => r.json() as Promise<NameTable>)
    .then((t) => (table = t));
  return loading;
}

export interface OpeningName {
  eco: string;
  name: string;
}

export function nameAt(fen: string): OpeningName | undefined {
  const hit = table?.[keyOfFen(fen)];
  return hit ? { eco: hit[0], name: hit[1] } : undefined;
}

/** Deepest named position along a sequence of FENs (the start position first). */
export function nameForPath(fens: string[]): OpeningName | undefined {
  for (let i = fens.length - 1; i >= 0; i--) {
    const n = nameAt(fens[i]);
    if (n) return n;
  }
  return undefined;
}
