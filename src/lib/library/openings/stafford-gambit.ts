import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'stafford-gambit',
  name: 'Stafford Gambit',
  eco: 'C42',
  side: 'black',
  group: 'black-e4',
  difficulty: 1,
  base: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6',
  summary:
    'Out of the Petrov, Black simply gives up the e5 pawn with 3...Nc6 and aims every piece at White\'s king. Objectively it is dubious: a White player who knows 5.d3 and 6.Be2, or the 5.f3 setup, keeps a clear extra pawn. At club level and in fast games it is a monster, because almost every natural White move (Bg5, O-O, h3, g3, d3) walks into a trap.',
  ideas: [
    'After 4.Nxc6 recapture 4...dxc6: the open d-file and fast development (...Bc5, ...Qd4 or ...Qh4) are your compensation for the pawn.',
    'The bishop on c5 is the engine of the gambit. It pins nothing yet, but it eyes f2 so that ...Ng4 and ...Bxf2+ or ...Nxf2 always hang in the air.',
    'Play ...h7–h5 early. It supports ...Ng4 (so Bxg4 opens the h-file for your rook) and prepares ...h4 against a castled king.',
    'Leave the e4 pawn alone while it is a lure: ...Nxe4 is strongest when it discovers something, like the queen on d8 hitting the d-file or ...Bxf2+ following.',
    'If White castles short too early, ...Ng4 with ...Qh4 or ...Qd6 and a rook on h8 is the classic mating pattern.',
    'Against 5.e5 go 5...Ne4. If White plays 6.d4, 6...Qh4 hits f2 and punishes a careless g3 with ...Nxg3.',
    'Against the calm 4.Nf3, simply take back with 4...Nxe4. You reach a Petrov with ...Nc6 already played and no problems at all.',
  ],
  opponentIdeas: [
    'The safest antidote is 5.d3 Bc5 6.Be2: guard g4, don\'t castle yet, play c3, Nd2 and d4 to push your bishop away. White keeps the pawn with a clear edge.',
    '5.f3 kills the tactics at the root: e4 is protected and g4 is covered. White then plays d3, c3 and Be2 and simply stays a pawn up.',
    'Against 5.Nc3 Bc5 the quiet 6.h3 stops ...Ng4 for good. The trick 6...Bxf2+? 7.Kxf2 Nxe4+ fails: after 8.Nxe4 Qd4+ 9.Ke1 Qxe4+ 10.Qe2 White is a piece for a pawn up.',
    'Avoid the natural but losing moves: 6.Bg5? (queen trap), early O-O followed by h3 and hxg4, and g2–g3 while ...Qh4 is possible.',
  ],
  structure:
    'After 4.Nxc6 dxc6 Black has doubled c-pawns but open lines: the d-file for the queen and rook, the a7–g1 diagonal for the c5 bishop and, after ...h5, the h-file. White has a healthy 4-vs-3 kingside majority and an extra pawn. If Black\'s attack fizzles, the endgame is simply lost, so the gambit lives on initiative and White\'s king safety.',
  lines: [
    {
      name: 'Main line, 5.d3 Bc5 6.Be2 h5',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Be2 h5 7. c3 Bb6 8. Nd2 Ng4 9. d4 c5 10. Nc4 cxd4 11. Nxb6 axb6 12. cxd4 Qh4 13. g3 Qf6',
      note: 'The critical test. White refuses to castle into ...Ng4 and pushes the bishop away with c3 and d4. Black keeps pieces active and hopes for a mistake.',
    },
    {
      name: '5.Nc3 Bc5 6.Bc4 Ng4 attack',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5 6. Bc4 Ng4 7. Qf3 Ne5 8. Qe2 Qh4 9. Bb3 Bg4 10. Qf1 O-O-O 11. h3 Bh5 12. g4 Bg6 13. d3 h5',
      note: 'The natural 6.Bc4 is already inaccurate: 6...Ng4 hits f2 twice. White must defend with Qf3 and Qe2, and Black gets a huge lead in development.',
    },
    {
      name: '5.Nc3 Bc5 6.h3 (the safe way)',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5 6. h3 Qe7 7. Qe2 Be6 8. d3 O-O-O 9. g3 Nd7 10. Bg2 Bd6 11. Be3 f6',
      note: '6.h3 takes g4 away from the knight. Don\'t force ...Bxf2+ here; develop, castle long and hope for play on the d-file.',
    },
    {
      name: '5.e5 Ne4 6.d4 Qh4',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. e5 Ne4 6. d4 Qh4 7. Be3 f6 8. Nd2 Bg4 9. Nf3 Bb4+ 10. c3 Bxf3 11. Qxf3 Nxc3',
      note: 'White gains space but the e4 knight is a thorn. After 7.g3?? Nxg3 Black wins the rook on h1. 7.Be3 is correct, and Black hits back with ...f6 and ...Bg4.',
    },
    {
      name: '5.f3, the sound antidote',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. f3 Nh5 6. g3 f5 7. Qe2 f4 8. g4 Nf6 9. Nc3 Bc5 10. d4 Qxd4 11. Bxf4',
      note: 'With e4 protected and g4 covered, there are no cheap tricks. Black plays for ...f5 and open lines. 5...Bc5 followed by ...O-O and ...Nh5 is the other way.',
    },
    {
      name: '4.Nf3 declines: back to a Petrov',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nf3 Nxe4 5. Nc3 Nxc3 6. dxc3 Bc5 7. Be2 O-O 8. O-O d5 9. Bg5 f6 10. Bf4 Re8 11. Re1 Be6',
      note: 'White gives back the pawn to avoid the mess. Black is fully equal with easy development.',
    },
  ],
  traps: [
    {
      name: 'Oh no, my queen! (6.Bg5?? Nxe4)',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Bg5 Nxe4 7. Bxd8 Bxf2+ 8. Ke2 Bg4#',
      victim: 'white',
      explanation: '6.Bg5 pins the knight, or so White thinks. 6...Nxe4! offers the queen. If 7.Bxd8, then 7...Bxf2+ 8.Ke2 Bg4# is mate. Even 7.dxe4 Bxf2+ 8.Kxf2 Qxd1 wins the queen. White is already lost after 6.Bg5?; 6.Be2 was the move.',
    },
    {
      name: 'The h-file mate (7.O-O Ng4 8.h3 Qd6 9.hxg4??)',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Be2 h5 7. O-O Ng4 8. h3 Qd6 9. hxg4 hxg4 10. g3 Qxg3#',
      victim: 'white',
      explanation: 'Castling into ...Ng4 is risky, and kicking the knight with 8.h3 invites 8...Qd6!, which ignores it. Taking with 9.hxg4?? opens the h-file: after 9...hxg4 Black mates in a few moves, for example 10.g3 Qxg3# (the f2 pawn is pinned by the c5 bishop and the rook on h8 covers h1) or 10.Re1 Qh2+ 11.Kf1 Qh1#. White had to find 9.e5! or, earlier, 8.Bxg4 hxg4.',
    },
    {
      name: '5.Nc3 Bc5 6.Bc4 Ng4 7.O-O?? Qh4',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5 6. Bc4 Ng4 7. O-O Qh4 8. h3 Bxf2+ 9. Rxf2 Qxf2+ 10. Kh1 h5 11. hxg4 hxg4#',
      victim: 'white',
      explanation: 'Castling into two attackers on f2 loses. After 8.h3 Bxf2+ 9.Rxf2 Qxf2+ 10.Kh1 h5! the g4 knight is taboo: 11.hxg4?? hxg4# is mate along the opened h-file. Even without 11.hxg4 Black is winning.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6', note: 'The Stafford: Black gives the e5 pawn for time. 4.Nxc6 dxc6 is the critical test. 4.Nf3 Nxe4 simply returns to a Petrov.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6', note: 'Recapture towards the centre? No: ...dxc6 opens the d-file and the c8 bishop. That is the whole point. Next come ...Bc5, ...h5 and ...Ng4.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5', note: 'Now 6.Bg5?? loses to 6...Nxe4! and 6.Be2 is best. White wants to stop ...Ng4 without weakening the kingside.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Be2 h5', note: '...h5 supports ...Ng4: if Bxg4 then ...hxg4 and the h-file opens. If White castles now, 7...Ng4 is dangerous: after 8.h3 Qd6 the knight is taboo, because 9.hxg4?? hxg4 opens the h-file for mate.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5', note: 'Two knights are fine for White here only with 6.h3. After 6.Bc4 Ng4! the f2 square is under fire, and 7.O-O?? Qh4 is already losing.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. e5 Ne4', note: 'The knight looks loose but it is a monster. 6.d3?? Bc5! and 7.dxe4 Bxf2+ 8.Kxf2 Qxd1 wins the queen. 6.d4 Qh4 is the main line; then 7.g3?? Nxg3 wins the rook.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. f3', note: 'The most solid answer: no pins, no ...Ng4. Play 5...Nh5 with ...f5, or 5...Bc5 with ...O-O. Your compensation is only positional now.' },
  ],
  modelGames: [],
};

export default opening;
