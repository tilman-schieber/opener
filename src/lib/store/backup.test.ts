import { describe, it, expect } from 'vitest';
import { parseBackup, backupFilename, BACKUP_VERSION } from './backup.ts';

describe('backup file', () => {
  it('accepts a minimal valid backup and fills missing lists', () => {
    const b = parseBackup({ app: 'opener', version: 1, repertoires: [{ id: 'r1' }], drill: [{ key: 'k' }] });
    expect(b.repertoires).toHaveLength(1);
    expect(b.drill).toHaveLength(1);
    expect(b.games).toEqual([]);
    expect(b.mygames).toEqual([]);
    expect(b.settings).toBeUndefined();
  });
  it('rejects files that are not backups, newer formats and malformed entries', () => {
    expect(() => parseBackup(null)).toThrow(/not an Opener backup/);
    expect(() => parseBackup({ app: 'other', version: 1 })).toThrow(/not an Opener backup/);
    expect(() => parseBackup({ app: 'opener', version: BACKUP_VERSION + 1 })).toThrow(/newer version/);
    expect(() => parseBackup({ app: 'opener', version: 1, games: 'nope' })).toThrow(/not a list/);
    expect(() => parseBackup({ app: 'opener', version: 1, games: [{ date: 1 }] })).toThrow(/no id/);
  });
  it('names the file by date', () => {
    expect(backupFilename(new Date('2026-10-23T12:00:00Z'))).toBe('opener-backup-2026-10-23.json');
  });
});
