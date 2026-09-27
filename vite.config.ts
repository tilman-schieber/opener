/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Cross-origin isolation enables SharedArrayBuffer, which the multi-threaded Stockfish build needs.
const isolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  base: './',
  plugins: [svelte()],
  server: { headers: isolation },
  preview: { headers: isolation },
  test: { include: ['src/**/*.test.ts'] },
});
