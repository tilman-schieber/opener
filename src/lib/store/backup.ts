/**
 * Backup and restore of everything the app keeps in the browser: repertoires, played games (with their
 * reviews), drill statistics, imported games and settings. The Lichess login and the explorer cache
 * are left out on purpose: the token is secret and the cache is cheap to refill.
 */
import { db } from './db.ts';
import type { Repertoire } from '../repertoire/model.ts';
import type { PlayedGame } from '../play/types.ts';
import type { LineStat } from '../drill/stats.ts';
import type { ImportedGame } from '../mygames/types.ts';

export const BACKUP_VERSION = 1;
const SETTINGS_KEY = 'opener:settings';

export interface Backup {
  app: 'opener';
  version: number;
  exportedAt: string;
  settings?: Record<string, unknown>;
  repertoires: Repertoire[];
  games: PlayedGame[];
  drill: LineStat[];
  mygames: ImportedGame[];
}

export type Counts = Record<'repertoires' | 'games' | 'drill' | 'mygames', number>;

export async function exportAll(): Promise<Backup> {
  const d = await db();
  let settings: Record<string, unknown> | undefined;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    settings = raw ? JSON.parse(raw) : undefined;
  } catch {
    settings = undefined;
  }
  return {
    app: 'opener',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    settings,
    repertoires: await d.getAll('repertoires'),
    games: await d.getAll('games'),
    drill: await d.getAll('drill'),
    mygames: await d.getAll('mygames'),
  };
}

export function backupFilename(now = new Date()): string {
  return `opener-backup-${now.toISOString().slice(0, 10)}.json`;
}

/** Checks the shape of a parsed backup file; throws with a readable message when it is not one. */
export function parseBackup(json: unknown): Backup {
  const b = json as Partial<Backup> | null;
  if (!b || typeof b !== 'object' || b.app !== 'opener') throw new Error('This is not an Opener backup file.');
  if (typeof b.version !== 'number' || b.version > BACKUP_VERSION) throw new Error(`This backup was made by a newer version of Opener (format ${b.version}).`);
  const list = <T extends { id?: string; key?: string }>(name: keyof Counts, idKey: 'id' | 'key'): T[] => {
    const v = (b as Record<string, unknown>)[name];
    if (v === undefined) return [];
    if (!Array.isArray(v)) throw new Error(`Backup field "${name}" is not a list.`);
    for (const x of v) if (!x || typeof x !== 'object' || typeof (x as Record<string, unknown>)[idKey] !== 'string') throw new Error(`An entry in "${name}" has no ${idKey}.`);
    return v as T[];
  };
  return {
    app: 'opener',
    version: b.version,
    exportedAt: typeof b.exportedAt === 'string' ? b.exportedAt : '',
    settings: b.settings && typeof b.settings === 'object' ? (b.settings as Record<string, unknown>) : undefined,
    repertoires: list<Repertoire>('repertoires', 'id'),
    games: list<PlayedGame>('games', 'id'),
    drill: list<LineStat>('drill', 'key'),
    mygames: list<ImportedGame>('mygames', 'id'),
  };
}

/**
 * Writes a backup into the local stores. Entries with the same id replace what is there; everything
 * else is kept, so restoring on a device that already has data merges rather than wipes.
 */
export async function importAll(backup: Backup, opts: { settings?: boolean } = {}): Promise<Counts> {
  const d = await db();
  const put = async <S extends 'repertoires' | 'games' | 'drill' | 'mygames'>(store: S, rows: Backup[S]) => {
    if (!rows.length) return 0;
    const tx = d.transaction(store, 'readwrite');
    await Promise.all([...rows.map((r) => tx.store.put(r as never)), tx.done]);
    return rows.length;
  };
  const counts: Counts = {
    repertoires: await put('repertoires', backup.repertoires),
    games: await put('games', backup.games),
    drill: await put('drill', backup.drill),
    mygames: await put('mygames', backup.mygames),
  };
  if (opts.settings !== false && backup.settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(backup.settings));
    } catch {
      /* ignore */
    }
  }
  return counts;
}
