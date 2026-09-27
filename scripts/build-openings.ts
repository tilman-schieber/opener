/** Converts lichess-org/chess-openings TSVs (CC0) into public/openings.json: { fenKey: [eco, name, pgn] }. */
import { readFileSync, writeFileSync } from 'node:fs';
import { Chess } from 'chessops/chess';
import { parseSan } from 'chessops/san';
import { fenKey } from '../src/lib/chess/key.ts';

const out: Record<string, [string, string, string]> = {};
for (const f of ['a', 'b', 'c', 'd', 'e']) {
  const lines = readFileSync(`scripts/data/${f}.tsv`, 'utf8').trim().split('\n').slice(1);
  for (const line of lines) {
    const [eco, name, pgn] = line.split('\t');
    const pos = Chess.default();
    for (const tok of pgn.split(' ')) {
      if (/^\d+\.$/.test(tok)) continue;
      const m = parseSan(pos, tok);
      if (!m) throw new Error(`bad move ${tok} in ${pgn}`);
      pos.play(m);
    }
    const k = fenKey(pos);
    // prefer the shortest line to reach a position (the "main" naming)
    if (!out[k] || out[k][2].length > pgn.length) out[k] = [eco, name, pgn];
  }
}
writeFileSync('public/openings.json', JSON.stringify(out));
console.log(Object.keys(out).length, 'named positions');
