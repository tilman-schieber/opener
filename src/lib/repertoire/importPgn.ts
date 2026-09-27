import { parsePgn, type Node, type PgnNodeData, type Game } from 'chessops/pgn';
import { authHeaders } from '../auth/lichess.svelte.ts';
import { addLine, countLines, emptyRoot, type RepNode } from './model.ts';

const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export interface ParsedRepertoire {
  root: RepNode;
  chapters: string[];
  lines: number;
  skipped: number;
}

function commentOf(d: PgnNodeData): string | undefined {
  const c = (d.comments ?? [])
    .map((x) => x.replace(/\[%[^\]]*\]/g, '').trim())
    .filter(Boolean)
    .join(' ');
  return c || undefined;
}

/** Turns every mainline and variation of every game/chapter into repertoire lines, keeping comments. */
export function repertoireFromPgn(text: string, into: RepNode = emptyRoot()): ParsedRepertoire {
  const games: Game<PgnNodeData>[] = parsePgn(text);
  const chapters: string[] = [];
  let skipped = 0;
  for (const g of games) {
    const fen = g.headers.get('FEN');
    if (fen && fen !== START) {
      skipped++;
      continue;
    }
    const chapter = g.headers.get('ChapterName') ?? g.headers.get('Opening') ?? g.headers.get('Event');
    if (chapter) chapters.push(chapter);
    const walk = (node: Node<PgnNodeData>, sans: string[], comments: (string | undefined)[]) => {
      if (!node.children.length) {
        if (sans.length) addLine(into, sans, chapter, comments);
        return;
      }
      for (const c of node.children) walk(c, [...sans, c.data.san], [...comments, commentOf(c.data)]);
    };
    walk(g.moves, [], []);
  }
  return { root: into, chapters, lines: countLines(into), skipped };
}

/** Accepts lichess.org/study/<id> or lichess.org/study/<id>/<chapter>. */
export async function fetchLichessStudy(url: string): Promise<string> {
  const m = url.match(/lichess\.org\/study\/([A-Za-z0-9]{8})(?:\/([A-Za-z0-9]{8}))?/);
  if (!m) throw new Error('That does not look like a Lichess study URL.');
  const path = m[2] ? `${m[1]}/${m[2]}` : m[1];
  const res = await fetch(`https://lichess.org/api/study/${path}.pgn?comments=true&variations=true&clocks=false`, { headers: authHeaders() });
  if (res.status === 404 || res.status === 403) throw new Error('Study not found or private (log in with Lichess to import private studies).');
  if (!res.ok) throw new Error(`Lichess error ${res.status}`);
  return res.text();
}
