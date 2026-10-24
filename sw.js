/* global self, caches, fetch, Response, URL, location */
/**
 * Opener service worker. Built into dist/sw.js by the plugin in vite.config.ts, which fills in the
 * precache list and a version hash. Two jobs:
 *
 * 1. Offline: the app shell (index.html, scripts, styles) is cached at install; everything else the
 *    app loads from its own origin (fonts, the explorer tree shards, the engine, opening names) is
 *    cached the first time it is used. Requests to other origins (Lichess, Chess.com) are not touched.
 *    Each build has its own cache; older caches are deleted when a new worker takes over.
 *
 * 2. Cross-origin isolation: every same-origin response gets the COOP/COEP headers, which static hosts
 *    like GitHub Pages cannot send. That turns on SharedArrayBuffer, so the multi-threaded Stockfish
 *    build can be used. The page reloads once after the first install to pick the headers up.
 */
const VERSION = 'f9116dbf691a';
const PRECACHE = ["assets/index-BhJKWc8T.css","assets/index-C-l8u-Rs.js"];
const CACHE = `opener-${VERSION}`;
const INDEX = new URL('./index.html', self.registration.scope).href;

const ISOLATION = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE.map((p) => new URL(p, self.registration.scope).href))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('opener-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(handle(req, url));
});

/** Adds the isolation headers to a same-origin response. */
function isolated(res) {
  if (!res || res.status === 0) return res;
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(ISOLATION)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

async function handle(req, url) {
  const cache = await caches.open(CACHE);
  if (req.mode === 'navigate') {
    // The page itself: network first so a deploy is seen on the next visit, the cached shell when offline.
    try {
      const res = await fetch(req);
      if (res.ok) cache.put(INDEX, res.clone());
      return isolated(res);
    } catch {
      return isolated(await cache.match(INDEX)) || Response.error();
    }
  }
  const hit = await cache.match(req);
  if (hit) return isolated(hit);
  try {
    const res = await fetch(req);
    if (res.ok && cacheable(url)) cache.put(req, res.clone());
    return isolated(res);
  } catch (err) {
    return Response.error();
  }
}

/** Everything the app ships with is immutable within a build, so it is safe to cache on first use. */
function cacheable(url) {
  return /\.(js|css|wasm|woff2?|json|svg|png|webmanifest)$/.test(url.pathname);
}
