import { db, uid } from '../store/db.ts';
import { allLibraryRepertoires, emptyRoot, type Repertoire } from './model.ts';

export const repertoires = $state<{ list: Repertoire[]; loaded: boolean }>({ list: [], loaded: false });

export async function loadRepertoires(): Promise<void> {
  const d = await db();
  repertoires.list = (await d.getAll('repertoires')).sort((a, b) => b.updatedAt - a.updatedAt);
  repertoires.loaded = true;
}

export async function saveRepertoire(rep: Repertoire): Promise<void> {
  rep.updatedAt = Date.now();
  const plain = $state.snapshot(rep) as Repertoire;
  await (await db()).put('repertoires', plain);
  const i = repertoires.list.findIndex((r) => r.id === rep.id);
  if (i >= 0) repertoires.list[i] = plain;
  else repertoires.list.unshift(plain);
}

export async function deleteRepertoire(id: string): Promise<void> {
  await (await db()).delete('repertoires', id);
  repertoires.list = repertoires.list.filter((r) => r.id !== id);
}

export function newRepertoire(name: string, color: 'white' | 'black', origin: Repertoire['origin'] = 'custom', libraryId?: string): Repertoire {
  const now = Date.now();
  return { id: uid(), name, color, origin, libraryId, root: emptyRoot(), notes: {}, createdAt: now, updatedAt: now };
}

let libCache: Repertoire[] | null = null;
export function libraryReps(): Repertoire[] {
  return (libCache ??= allLibraryRepertoires());
}

/** Finds a user or library repertoire by id. */
export function findRepertoire(id: string): Repertoire | undefined {
  return repertoires.list.find((r) => r.id === id) ?? libraryReps().find((r) => r.id === id);
}
