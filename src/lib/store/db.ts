import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Repertoire } from '../repertoire/model.ts';
import type { PlayedGame } from '../play/types.ts';
import type { LineStat } from '../drill/stats.ts';
import type { ImportedGame } from '../mygames/types.ts';

interface OpenerDB extends DBSchema {
  repertoires: { key: string; value: Repertoire };
  games: { key: string; value: PlayedGame; indexes: { date: number } };
  drill: { key: string; value: LineStat };
  mygames: { key: string; value: ImportedGame; indexes: { account: string } };
  explorer: { key: string; value: { key: string; data: unknown; at: number } };
}

let dbp: Promise<IDBPDatabase<OpenerDB>> | null = null;

export function db(): Promise<IDBPDatabase<OpenerDB>> {
  dbp ??= openDB<OpenerDB>('opener', 1, {
    upgrade(d) {
      d.createObjectStore('repertoires', { keyPath: 'id' });
      d.createObjectStore('games', { keyPath: 'id' }).createIndex('date', 'date');
      d.createObjectStore('drill', { keyPath: 'key' });
      d.createObjectStore('mygames', { keyPath: 'id' }).createIndex('account', 'account');
      d.createObjectStore('explorer', { keyPath: 'key' });
    },
  });
  return dbp;
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
