/**
 * Registers the service worker (production only) and tracks updates. The first install reloads the
 * page once so it is served with the cross-origin isolation headers the worker adds; later updates
 * wait until the user asks for them, so a game in progress is never interrupted.
 */
export const appUpdate = $state<{ ready: boolean }>({ ready: false });

let waiting: ServiceWorker | null = null;
let reloading = false;

function reloadOnce() {
  if (reloading) return;
  reloading = true;
  location.reload();
}

export function applyUpdate() {
  waiting?.postMessage('SKIP_WAITING');
}

export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  const firstInstall = !navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // A worker took over: either the first install (reload to get isolation) or an update the user accepted.
    if (firstInstall && sessionStorage.getItem('opener:sw-reloaded')) return;
    sessionStorage.setItem('opener:sw-reloaded', '1');
    reloadOnce();
  });
  navigator.serviceWorker
    .register(`${import.meta.env.BASE_URL}sw.js`)
    .then((reg) => {
      const track = (sw: ServiceWorker | null) => {
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            waiting = sw;
            appUpdate.ready = true;
          }
        });
      };
      if (reg.waiting && navigator.serviceWorker.controller) {
        waiting = reg.waiting;
        appUpdate.ready = true;
      }
      track(reg.installing);
      reg.addEventListener('updatefound', () => track(reg.installing));
    })
    .catch(() => {
      /* no offline support, the app still works */
    });
}
