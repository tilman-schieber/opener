import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'benko-gambit',
  name: 'Benko Gambit',
  eco: 'A57–A59',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 Nf6 2. c4 c5 3. d5 b5',
  summary:
    'Black gives up the b-pawn for two open files on the queenside and a bishop on g7 that rakes the long diagonal. The compensation is long term: even in the endgame the a- and b-file pressure often wins the pawn back. It is one of the few gambits that grandmasters still trust, and the plans are the same in almost every game.',
  ideas: [
    'After 4.cxb5 a6 5.bxa6 recapture with ...Bxa6, fianchetto with ...g6 and ...Bg7, then castle. This setup is the same in almost every line.',
    'Put the rooks on a8 and b8. Together with ...Qa5 or ...Qb6 they press on a2 and b2, and White often has to give a pawn back.',
    'The g7 bishop is your best piece. Keep the long diagonal open and look for ...Nxe4 or ...Nxd5 tricks that uncover it against c3 and a1.',
    'Knight routes: ...Nb8–d7–b6 or ...Nd7–e5 aim at c4 and d3, and ...Nf6–e8–c7 heads for b5.',
    'Against 7.e4, trade light-squared bishops with ...Bxf1. White cannot castle and has to walk the king with Kf1–g2.',
    'Break with ...e6 or ...c4 only when it opens lines for your pieces. The standard plan is slow queenside pressure, not a kingside attack.',
    'Do not panic in the endgame. Trading queens often helps Black here, because the queenside files stay open.',
  ],
  opponentIdeas: [
    'Keep the extra pawn and consolidate with Nf3, g3, Kg2 (or Bg2 and O-O), then Qc2, Rb1 and b3 to cover the queenside.',
    'Push e4–e5 before Black is fully developed. It is the sharpest try, and you have to meet it with accurate piece play.',
    'Decline or return the pawn: 5.b6 and 5.e3 give it back for a solid position, while 4.Nf3 and 4.a4 avoid the gambit altogether.',
  ],
  structure:
    'After the accepted lines White has an extra pawn: a d5 pawn cramping Black, plus e4 in the main line. Black has half-open a- and b-files, a pawn on c5 and a solid d6 and e7 chain. White is safer in the centre, Black owns the queenside files and the long a1–h8 diagonal. The a2 and b2 pawns are the targets, so every piece you have should point at them.',
  lines: [
    {
      name: 'Main line, 7.e4 and the king walk',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. e4 Bxf1 8. Kxf1 d6 9. Nf3 Bg7 10. g3 O-O 11. Kg2 Nbd7 12. Re1 Qa5 13. Re2 Rfb8',
      note: 'White walks the king to g2 after ...Bxf1. Black sets up the classic battery: queen on a5, rooks on a8 and b8, bishop on g7.',
    },
    {
      name: 'Fianchetto, 7.Nf3 and g3',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. Nf3 d6 8. g3 Bg7 9. Bg2 Nbd7 10. O-O O-O 11. Qc2 Qb6 12. Rb1 Rfb8',
      note: 'White castles normally and keeps the light-squared bishops on the board. Black still gets the same queenside pressure with ...Qb6 and ...Rfb8.',
    },
    {
      name: 'Pawn return, 5.b6',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. b6 Qxb6 6. Nc3 d6 7. e4 g6 8. Nf3 Bg7 9. Nd2 O-O 10. Be2 Nbd7 11. O-O Ne8 12. a4 Rb8',
      note: 'White gives the pawn back to keep the a-file closed. Material is level and Black plays a Benoni-style game with an open b-file.',
    },
    {
      name: 'Modern Variation, 5.e3',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. e3 g6 6. Nc3 d6 7. a4 Bg7 8. Nf3 O-O 9. Ra3 axb5 10. Bxb5 Ba6 11. Bd2 Bxb5 12. axb5 Nbd7 13. O-O Nb6',
      note: 'White supports b5 with a4 and aims to keep the queenside closed. Black takes on b5, trades the light-squared bishops and targets the b5 pawn with ...Nb6.',
    },
    {
      name: 'Declined, 4.Nf3',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. Nf3 bxc4 5. Nc3 g6 6. e4 d6 7. Bxc4 Bg7 8. O-O O-O 9. h3 Ba6 10. Bxa6 Nxa6 11. Bf4 Qb6 12. Rb1 Nd7 13. Re1 Nc7',
      note: 'White ignores b5. Black simply takes on c4 and gets a Benoni structure with the half-open b-file. Trading bishops with ...Ba6 is the thematic idea again.',
    },
    {
      name: 'Declined, 4.a4',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. a4 b4 5. Nf3 g6 6. g3 Bg7 7. Bg2 d6 8. O-O O-O 9. Nbd2 a5 10. Ra2 Na6 11. b3 Nc7',
      note: 'After 4.a4 the pawn goes to b4 and the queenside is closed. Black gets a solid Benoni-like game with the c5 and b4 pawns gaining space.',
    },
  ],
  traps: [
    {
      name: 'Long diagonal: 12.b3? Nxe4!',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. e4 Bxf1 8. Kxf1 d6 9. Nf3 Bg7 10. g3 O-O 11. Kg2 Nbd7 12. b3 Nxe4 13. Nxe4 Bxa1',
      victim: 'white',
      explanation: 'White plays b3 to protect c4 and stop ...Qa5 ideas, but it opens the a1–h8 diagonal. The f6 knight jumps to e4, White recaptures, and the g7 bishop takes the rook on a1. Black wins the exchange and a pawn. While the b2 pawn is at home, the same trick only hits b2.',
    },
  ],
  positions: [
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5',
      note: 'The Benko. Black hits c4 at once. 4.cxb5 is the main test, 4.Nf3 and 4.a4 decline, and 4.Nd2 or 4.Qc2 are rarer ways to keep the pawn structure.',
    },
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6',
      note: 'Black offers a second pawn trade on a6. 5.bxa6 accepts, 5.b6 and 5.e3 give the pawn back, and 5.f3 (the Dlugy Variation) prepares e4 with a solid pawn chain.',
    },
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6',
      note: 'Standard Benko setup. The bishop on a6 stops White from castling after e4 and Bf1 moves. White chooses between 7.e4 and the fianchetto with Nf3 and g3.',
    },
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. e4 Bxf1 8. Kxf1',
      note: 'White has lost the right to castle. The usual fix is g3 and Kg2, which takes time. Use that time to finish development with ...d6, ...Bg7, ...O-O and ...Nbd7.',
    },
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. e4 Bxf1 8. Kxf1 d6 9. Nf3 Bg7 10. g3 O-O 11. Kg2 Nbd7',
      note: 'Typical position. Black continues with ...Qa5 and ...Rfb8. Watch for White playing b3 too early: ...Nxe4 then ...Bxa1 wins the exchange.',
    },
    {
      moves: '1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. b6',
      note: 'White returns the pawn so that the a-file stays closed. Take back with ...Qxb6 or play ...d6 and ...Nbd7 first. You keep the b-file and quick development.',
    },
  ],
  modelGames: [],
};

export default opening;
