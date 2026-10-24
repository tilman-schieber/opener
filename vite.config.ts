/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Cross-origin isolation enables SharedArrayBuffer, which the multi-threaded Stockfish build needs.
// In production the service worker (src/sw.js) adds the same headers on hosts that cannot send them.
const isolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

/** Emits dist/sw.js from src/sw.js with the list of built shell files and a version hash filled in. */
function serviceWorker(): Plugin {
  return {
    name: 'opener-service-worker',
    apply: 'build',
    generateBundle(_, bundle) {
      const shell = Object.values(bundle)
        .filter((f) => f.fileName === 'index.html' || /\.(js|css)$/.test(f.fileName))
        .map((f) => f.fileName)
        .sort();
      const version = createHash('sha1').update(shell.join('\n')).digest('hex').slice(0, 12);
      const source = readFileSync(new URL('./src/sw.js', import.meta.url), 'utf8')
        .replace('__VERSION__', version)
        .replace('__PRECACHE__', JSON.stringify(shell));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [svelte(), serviceWorker()],
  server: { headers: isolation },
  preview: { headers: isolation },
  test: { include: ['src/**/*.test.ts'] },
});
