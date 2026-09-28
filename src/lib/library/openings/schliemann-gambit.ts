import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'schliemann-gambit',
  name: 'Schliemann Gambit',
  eco: 'C63',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5',
  summary:
    "Also called the Jaenisch Gambit: Black answers the Ruy Lopez with a King's Gambit in reverse, striking at e4 with 3...f5. It is sharp and a little risky, but it avoids the huge body of Ruy Lopez theory and puts the burden on White from move three. Top players still use it as a surprise weapon.",
  ideas: [
    'Against 4.Nc3 take on e4 with 4...fxe4 and meet 5.Nxe4 with 5...d5!. After 6.Nxe5 dxe4 7.Nxc6 the queen jumps to g5 and hits g2 and b5 at the same time.',
    'In the main line Black gives up castling kingside and often castles long. Queen, rooks and bishops aim at the white king on the open e- and f-files.',
    "If White declines with 4.d3, take on e4 and develop with ...Nf6, ...Bc5, ...d6 and ...O-O. You have an open f-file and a comfortable Ruy Lopez where f5 has been traded for d3.",
    'Against 4.exf5 play 4...e4!. The pawn on e4 cramps White, and the f5 pawn usually falls back to you later with ...Nh6 or ...Nf6 and ...Qe7.',
    'The half-open f-file is yours. A rook on f8 and a knight on f6 or g4 put constant pressure on f2.',
    'Your bishop pair and lead in development are the compensation. Do not trade queens early unless you have won the pawn back.',
  ],
  opponentIdeas: [
    '4.Nc3 is the critical test. After 5...d5 6.Nxe5 dxe4 7.Nxc6 Qg5 8.Qe2! Nf6 9.f4 the position is wild but roughly balanced. White must know this line.',
    '4.d3 is the safe way: White keeps a sound structure and hopes the f-pawn advance leaves holes around Black\'s king. Expect a quiet game with a small edge for White.',
    '4.d4 and 4.exf5 aim for quick central play before Black is developed. They are less dangerous, but you must know the key reply.',
    "White's main tactical theme is the loose e8 king: Qh5+ and Qe2 pinning on the e-file come up again and again.",
  ],
  structure:
    "After ...fxe4 Black has a half-open f-file and a central pawn on e5 or e4, while White keeps the d-pawn. In the 4.Nc3 main line the centre disappears completely and both kings stay in the middle for a while, so piece activity counts more than structure. In the quiet 4.d3 lines you get a Ruy Lopez structure where Black's f-pawn has gone, which opens lines on the kingside but weakens e6 and the a2–g8 diagonal.",
  lines: [
    {
      name: '4.Nc3 fxe4 5.Nxe4 d5, main line with 7...Qg5',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4 d5 6. Nxe5 dxe4 7. Nxc6 Qg5 8. Qe2 Nf6 9. f4 Qxf4 10. Ne5+ c6 11. d4 Qh4+ 12. g3 Qh3 13. Bc4 Be6 14. Bg5 O-O-O 15. O-O-O Bd6',
      note: 'The critical main line. Black castles long, the queen harasses from h3 and both sides have attacking chances. Engines rate it close to equal.',
    },
    {
      name: '4.Nc3 fxe4 5.Nxe4 Nf6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4 Nf6 6. Nxf6+ Qxf6 7. Qe2 Be7 8. Bxc6 dxc6 9. Nxe5 Bf5 10. O-O O-O',
      note: 'The calmer 5...Nf6 gives up the e5 pawn for development and the bishop pair. White keeps a small edge but Black has easy play.',
    },
    {
      name: '4.Nc3 Nd4, Tartakower style',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 Nd4 5. Ba4 Nf6 6. O-O c6 7. Nxe5 fxe4 8. Ng4 d5 9. Nxf6+ Qxf6',
      note: 'A quieter choice that avoids the main line. Black gets a big centre with ...c6 and ...d5 in return for the e5 pawn.',
    },
    {
      name: '4.d3 fxe4 5.dxe4 Nf6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. d3 fxe4 5. dxe4 Nf6 6. O-O Bc5 7. Qd3 d6 8. Qc4 Qe7 9. Nc3 Bd7 10. Bg5 a6',
      note: 'The quiet line. Black develops normally and has the f-file. 7.Qd3 and 8.Qc4 try to exploit the a2–g8 diagonal, but ...Qe7 covers everything.',
    },
    {
      name: '4.exf5 e4 5.Qe2 Qe7',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. exf5 e4 5. Qe2 Qe7 6. Bxc6 dxc6 7. Nd4 Nh6 8. Nc3 Nxf5 9. Nxf5 Bxf5',
      note: 'Black wins the f5 pawn back via ...Nh6 and keeps the cramping pawn on e4. The bishop pair gives Black easy play.',
    },
    {
      name: '4.d4 fxe4 5.Nxe5 Nxe5 6.dxe5 c6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. d4 fxe4 5. Nxe5 Nxe5 6. dxe5 c6 7. Nc3 cxb5 8. Nxe4 d5 9. exd6 Nf6 10. Bg5 Qa5+ 11. Nc3 b4',
      note: 'White sacrifices the bishop for a lead in development and the passed d6 pawn. Black keeps the extra piece with ...Qa5+ and ...b4 but must develop quickly.',
    },
  ],
  traps: [
    {
      name: 'The Qg5 double attack (8.d4?? Qxb5)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4 d5 6. Nxe5 dxe4 7. Nxc6 Qg5 8. d4 Qxb5 9. Ne5 Nf6',
      victim: 'white',
      explanation: '7...Qg5 attacks g2 and the bishop on b5 along the fifth rank, and the knight on c6 is attacked too. Only 8.Qe2! holds, because 8...Qxg2? then runs into 9.Qh5+. The natural 8.d4? or 8.O-O? loses the bishop to 8...Qxb5, and Black is a piece up.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5', note: 'The Schliemann: a reversed King\'s Gambit. 4.Nc3 is the critical test, 4.d3 the solid choice. Against almost everything, ...fxe4 comes next.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4', note: 'Now 5...d5! is the principled move: 6.Nxe5 dxe4 7.Nxc6 Qg5. 5...Nf6 is a quieter alternative.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4 d5 6. Nxe5 dxe4 7. Nxc6 Qg5', note: 'The queen hits g2 and b5. White must play 8.Qe2!, which guards the bishop and hits e4. Do not grab 8...Qxg2? now: 9.Qh5+ wins. Play 8...Nf6 instead.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3 fxe4 5. Nxe4 d5 6. Nxe5 dxe4 7. Nxc6', note: 'Do not recapture with 7...bxc6?: 8.Bxc6+ Bd7 9.Qh5+ gives White a big advantage. 7...Qg5 is the only good move.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. d3', note: 'The quiet approach. Take with 4...fxe4 5.dxe4 Nf6 and develop with ...Bc5, ...d6 and ...O-O. You have the f-file and no problems.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. exf5', note: 'Push past with 4...e4!. The knight on f3 must move, and you win the f5 pawn back later with ...Nh6 or ...Nf6 and ...Qe7.' },
  ],
  modelGames: [],
};

export default opening;
