// Copies the Stockfish lite WASM builds (single + multi-threaded) into public/stockfish.
import { mkdirSync, copyFileSync } from 'node:fs';
const src = 'node_modules/stockfish/bin/';
mkdirSync('public/stockfish', { recursive: true });
for (const f of ['stockfish-19-lite-single.js', 'stockfish-19-lite-single.wasm', 'stockfish-19-lite.js', 'stockfish-19-lite.wasm'])
  copyFileSync(src + f, 'public/stockfish/' + f);
copyFileSync('node_modules/stockfish/Copying.txt', 'public/stockfish/COPYING.txt');
