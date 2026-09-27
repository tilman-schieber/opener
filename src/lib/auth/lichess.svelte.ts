/**
 * "Login with Lichess" via OAuth 2 Authorization Code + PKCE. Lichess allows public clients
 * without registration, so this works fully client-side. The token only unlocks the opening
 * explorer (and private studies); it never leaves the browser.
 */
const LICHESS = 'https://lichess.org';
const CLIENT_ID = 'opener-trainer';
const TOKEN_KEY = 'opener:lichess-token';
const PENDING_KEY = 'opener:lichess-pkce';

interface StoredToken {
  token: string;
  expires: number;
}

export interface LichessAccount {
  username: string;
  ratings: Partial<Record<'blitz' | 'rapid' | 'classical' | 'bullet', number>>;
}

export const auth = $state<{ token: string | null; account: LichessAccount | null; error: string | null }>({
  token: readToken(),
  account: null,
  error: null,
});

function readToken(): string | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const t = JSON.parse(raw) as StoredToken;
    if (t.expires < Date.now()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return t.token;
  } catch {
    return null;
  }
}

function redirectUri(): string {
  return location.origin + location.pathname;
}

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function login(): Promise<void> {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)));
  const challenge = b64url(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
  const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
  sessionStorage.setItem(PENDING_KEY, JSON.stringify({ verifier, state, hash: location.hash }));
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: redirectUri(),
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: 'study:read',
    state,
  });
  location.href = `${LICHESS}/oauth?${params}`;
}

/** Call once on startup: completes a pending login if the URL carries ?code=…&state=… */
export async function completeLogin(): Promise<void> {
  const url = new URL(location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  if (!code && !error) return;
  const pending = JSON.parse(sessionStorage.getItem(PENDING_KEY) ?? 'null') as { verifier: string; state: string; hash: string } | null;
  sessionStorage.removeItem(PENDING_KEY);
  history.replaceState(null, '', location.pathname + (pending?.hash ?? ''));
  if (error) {
    auth.error = `Lichess login cancelled (${error}).`;
    return;
  }
  if (!pending || pending.state !== state) {
    auth.error = 'Login failed: state mismatch. Please try again.';
    return;
  }
  const res = await fetch(`${LICHESS}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code!,
      code_verifier: pending.verifier,
      redirect_uri: redirectUri(),
      client_id: CLIENT_ID,
    }),
  });
  if (!res.ok) {
    auth.error = `Login failed (${res.status}).`;
    return;
  }
  const body = (await res.json()) as { access_token: string; expires_in: number };
  const stored: StoredToken = { token: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(stored));
  auth.token = body.access_token;
}

export async function loadAccount(): Promise<void> {
  if (!auth.token) return;
  const res = await fetch(`${LICHESS}/api/account`, { headers: { Authorization: `Bearer ${auth.token}` } });
  if (res.status === 401) return forget();
  if (!res.ok) return;
  const a = await res.json();
  const r = (k: string) => a.perfs?.[k]?.rating as number | undefined;
  auth.account = { username: a.username, ratings: { blitz: r('blitz'), rapid: r('rapid'), classical: r('classical'), bullet: r('bullet') } };
}

export async function logout(): Promise<void> {
  const token = auth.token;
  forget();
  if (token) await fetch(`${LICHESS}/api/token`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}

/** Drops a token Lichess rejected (expired or revoked). */
export function forget(): void {
  localStorage.removeItem(TOKEN_KEY);
  auth.token = null;
  auth.account = null;
}

export function authHeaders(): Record<string, string> {
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
}
