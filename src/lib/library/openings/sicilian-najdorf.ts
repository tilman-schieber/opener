import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'sicilian-najdorf',
  name: 'Sicilian Najdorf',
  eco: 'B90–B99',
  side: 'black',
  group: 'black-e4',
  difficulty: 3,
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6',
  summary:
    'The most famous fighting defence to 1.e4: the modest 5...a6 keeps White\'s pieces off b5, prepares ...b5 and keeps Black\'s options open between ...e5 and ...e6. Black accepts a slightly passive position in exchange for a healthy extra central pawn, the half-open c-file and rich counterplay. Expect opposite-side castling races and sharp tactics.',
  ideas: [
    'Choose your centre according to White\'s setup: ...e5 (kicking the d4 knight and grabbing space) against Be3, Be2 and h3; ...e6 (Scheveningen shape) against Bg5 and Bc4, where ...e5 would leave d5 too weak.',
    'After ...e5, fight for the d5 square with ...Be6, ...Be7, ...Nbd7 and ...O-O. If you ever achieve ...d5 safely, you have usually equalised or better.',
    'Queenside counterplay is your engine: ...b5–b4 to kick the c3 knight away from e4 and d5, ...Bb7 on the long diagonal, and ...Rc8 / ...Qc7 on the half-open c-file.',
    'Remember the thematic exchange sacrifice ...Rxc3: it wrecks White\'s pawns in front of a queenside-castled king and often wins the e4 pawn.',
    'Against the Bc4 (Sozin/Fischer) setup, harass the bishop with ...b5 and trade it with ...Nbd7–c5 (or ...Na5), so that White\'s sacrifices on e6 and f7 disappear.',
    'In opposite-side castling races, count tempi: slowing White\'s pawn storm with ...h6 or blocking moves is often less effective than pushing your own queenside pawns faster.',
    'Keep the king in the centre a little longer against 6.Bg5 — castling early walks into the g-pawn storm, while ...Qc7, ...Nbd7 and ...b5 improve your position first.',
  ],
  opponentIdeas: [
    'English Attack (Be3, f3, Qd2, O-O-O, g4–g5): kick the f6 knight away and storm the kingside with pawns.',
    'With 6.Bg5 and f4, White prepares e4–e5 breaks and sacrifices on e6, d5 or b5 while Black is still undeveloped.',
    'Plant a knight on d5 — in ...e5 structures that square is Black\'s eternal weakness.',
    'The Sozin bishop on c4/b3 aims at e6 and f7, supporting sacrifices like Nxe6 or Nd5 and the f4–f5 push.',
  ],
  structure:
    'After the opening Black has a pawn on d6 and either e5 or e6, versus White\'s lone e4 pawn and a half-open d-file. With ...e5, d5 is a hole that both sides fight for, but Black owns more central space. With ...e6 Black has the compact "small centre" (d6/e6) that waits for ...d5 or ...b5–b4 counterplay. Black\'s c-file is half-open for the rooks.',
  lines: [
    {
      name: 'English Attack, 6.Be3 e5',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Be7 9. Qd2 O-O 10. O-O-O Nbd7 11. g4 b5 12. g5 b4 13. Ne2 Ne8 14. f4 a5',
      note: 'The modern main line: opposite-side castling and a pure pawn race. Every tempo counts.',
    },
    {
      name: 'English Attack, 6...e6 Scheveningen style',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e6 7. f3 b5 8. Qd2 Nbd7 9. g4 h6 10. O-O-O Bb7 11. h4 b4 12. Na4 d5',
      note: 'Black keeps the small centre and hits back in the middle with ...d5 once the knight is kicked to a4.',
    },
    {
      name: '6.Bg5 classical main line',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7 9. O-O-O Nbd7 10. g4 b5 11. Bxf6 Nxf6 12. g5 Nd7 13. f5 Nc5 14. f6 gxf6 15. gxf6 Bf8',
      note: 'The old main line: White breaks through on the kingside, Black relies on the bishop pair and ...b4 counterplay.',
    },
    {
      name: '6.Be2 classical, 6...e5',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. O-O O-O 9. Be3 Be6 10. Qd2 Nbd7 11. a4 Rc8 12. a5 Qc7 13. Rfd1',
      note: 'A positional line: both sides fight for d5. Black is comfortable once ...b5 or ...d5 becomes possible.',
    },
    {
      name: 'Sozin / Fischer, 6.Bc4',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4 e6 7. Bb3 b5 8. O-O Be7 9. Qf3 Qc7 10. Qg3 O-O 11. Bh6 Ne8 12. Rad1 Bd7',
      note: 'Fischer\'s favourite with White. Black kicks the bishop with ...b5 and defends patiently; the e8 knight holds g7.',
    },
    {
      name: 'Adams Attack, 6.h3',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. h3 e5 7. Nde2 h5 8. Bg5 Be6 9. Bxf6 Qxf6 10. Nd5 Qd8 11. Qd3',
      note: 'White prepares g4; Black stops it with ...h5 and uses the bishop pair.',
    },
  ],
  traps: [
    {
      name: 'Gothenburg disaster',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 h6 9. Bh4 g5 10. fxg5 Nfd7 11. Nxe6 fxe6 12. Qh5+ Kf8 13. Bb5',
      victim: 'black',
      explanation: 'The flashy 9...g5 idea was refuted over the board at the 1955 Gothenburg Interzonal: 11.Nxe6! fxe6 12.Qh5+ Kf8 13.Bb5! brings every White piece into the attack while Black\'s king is stuck. Don\'t weaken your kingside while undeveloped.',
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6', note: 'The Najdorf. ...a6 covers b5, prepares ...b5 and ...e5. Now White chooses: Be3 (English Attack), Bg5, Be2, Bc4 or h3.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3', note: 'English Attack coming (f3, Qd2, g4, O-O-O). Play ...e5 and ...Be6, or ...e6 with ...b5. 6...Ng4 hitting the bishop is also a respected option.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6', note: 'Standard ...e5 setup: the e6 bishop watches d5 and c4. Castle short, then ...Nbd7, ...b5 and ...b4 as fast as possible.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5', note: 'The sharpest reply. Play 6...e6 — after ...e5 the pin on f6 would make d5 a permanent hole. Beware e4–e5 and sacrifices on e6.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4', note: 'The bishop eyes e6 and f7. Answer with ...e6 and ...b5, then trade the bishop with ...Nbd7–c5.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6', note: 'The Poisoned Pawn: Black grabs b2 after 8.Qd2 Qxb2. Objectively fine but only with deep preparation — the queen can easily get trapped.' },
  ],
  modelGames: [
    { white: 'Boris Spassky', black: 'Bobby Fischer', year: 1972, event: 'World Championship, Reykjavik (game 11)', lesson: 'Fischer\'s beloved Poisoned Pawn went wrong: Spassky showed how dangerous it is when the b2-grabbing queen runs short of squares. Great warning about queen safety.' },
  ],
};

export default opening;
