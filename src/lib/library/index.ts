import type { LibraryOpening } from './types.ts';

const modules = import.meta.glob<{ default: LibraryOpening }>('./openings/*.ts', { eager: true });

export const OPENINGS: LibraryOpening[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.group.localeCompare(b.group) || a.difficulty - b.difficulty || a.name.localeCompare(b.name));

export function getOpening(id: string): LibraryOpening | undefined {
  return OPENINGS.find((o) => o.id === id);
}
