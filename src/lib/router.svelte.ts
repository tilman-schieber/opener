/** Minimal hash router: #/path/segments?query */
export interface Route {
  path: string[];
  query: URLSearchParams;
}

function parse(): Route {
  const h = location.hash.replace(/^#\/?/, '');
  const [p, q] = h.split('?');
  return { path: p ? p.split('/').map(decodeURIComponent) : [], query: new URLSearchParams(q ?? '') };
}

export const route = $state<Route>(parse());

window.addEventListener('hashchange', () => {
  const r = parse();
  route.path = r.path;
  route.query = r.query;
});

export function go(path: string, query?: Record<string, string | undefined>) {
  const q = query ? new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined) as [string, string][]).toString() : '';
  location.hash = `#/${path}${q ? '?' + q : ''}`;
}

export function href(path: string, query?: Record<string, string | undefined>) {
  const q = query ? new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined) as [string, string][]).toString() : '';
  return `#/${path}${q ? '?' + q : ''}`;
}
