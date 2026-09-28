import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'blackmar-diemer',
  name: 'Blackmar-Diemer Gambit',
  eco: 'D00',
  side: 'white',
  group: 'white-d4',
  difficulty: 2,
  base: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3',
  summary:
    'White offers the f-pawn to open the f-file and get a big lead in development against 1...d5. After 4...exf3 5.Nxf3 White has the half-open f-file, quick castling and attacking ideas like Qe1–h4, Bxf7+ and Ne5. Engines consider it slightly dubious, but Black has to know which defence to choose, and many club players do not.',
  ideas: [
    'Develop fast and castle short: Nxf3, Bd3 or Bc4, O-O. Every tempo counts more than the pawn.',
    'The queen lift Qd1–e1–h4 (or Qe1–g3) brings the queen to the kingside in two moves. Combine it with Bh6 or Bg5 against the castled king.',
    'Use the half-open f-file. A rook on f1 pressures f7 and supports Ne5 and Bxf7+ tricks.',
    'Put a knight on e5. It hits f7 and c6 and supports Bxf7+ or Qh5 ideas.',
    'Against ...Bg4 or ...Bf5 play h3 or Ne5 to gain time on the bishop, and against ...Bf5 the pawn push g2–g4 can win space with tempo.',
    'Watch out for Black\'s ...Qxd4 grabs. Many are poisoned: Qxb7 or a discovered attack on the d-file often wins material.',
    'If Black returns the pawn early, take the simple position with a lead in development rather than forcing an attack.',
  ],
  opponentIdeas: [
    'The Teichmann 5...Bg4 6.h3 Bxf3 7.Qxf3 c6 is the most solid defence. Black gives up the bishop pair to kill your f3 knight and plays ...e6, ...Nbd7 and later ...Qxd4 when it is safe.',
    'The Euwe 5...e6 and the Bogoljubov 5...g6 aim to castle quickly and then counterattack d4 with ...c5 or ...Nc6.',
    'Declining with 4...Bf5 or 4...e5 avoids the main theory. You get a normal game, but have to be precise.',
  ],
  structure:
    'After 4...exf3 5.Nxf3 White has pawns on d4 and on the queenside and kingside, but no e- or f-pawn. The e- and f-files are open for White\'s rooks, and d4 is the only central pawn. Black has an extra pawn and a solid position without weaknesses. White must use the open files and the lead in development before Black completes castling and attacks d4.',
  lines: [
    {
      name: 'Teichmann Defence, 5...Bg4',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bg4 6. h3 Bxf3 7. Qxf3 c6 8. Bd3 e6 9. O-O Nbd7 10. Bf4 Be7 11. Kh1 O-O 12. Rae1',
      note: 'Black trades the bishop for the f3 knight. White has the bishop pair and pressure on the f-file, and Qf3 eyes b7.',
    },
    {
      name: 'Euwe Defence, 5...e6 6.Bg5',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 e6 6. Bg5 Be7 7. Bd3 O-O 8. Qe2 Nc6 9. O-O-O Nb4 10. h4 Nxd3+ 11. Rxd3',
      note: 'White castles long and attacks with h4–h5 and Ng5. Black trades the dangerous d3 bishop with ...Nb4.',
    },
    {
      name: 'Bogoljubov Defence, Studier Attack 8.Qe1',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 g6 6. Bc4 Bg7 7. O-O O-O 8. Qe1 Nc6 9. Qh4 Bg4 10. Be3 e6 11. Ne5 Bf5 12. Nxc6 bxc6 13. h3',
      note: 'The classic BDG attack: Qe1–h4, Be3–h6 and a rook on f1. Black has to defend the king before grabbing more pawns.',
    },
    {
      name: 'Gunderam Defence, 5...Bf5 6.Ne5',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bf5 6. Ne5 e6 7. g4 Be4 8. Nxe4 Nxe4 9. Qf3 Qh4+ 10. Ke2 Nd6 11. Bg2',
      note: 'White hunts the bishop with Ne5 and g4. The white king walks to e2, but Qf3 and Bg2 target f7 and b7.',
    },
    {
      name: 'Ziegler Defence, 5...c6 6.Bc4',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 c6 6. Bc4 Bf5 7. Ne5 e6 8. g4 Bg6 9. g5 Nd5 10. Nxd5 exd5 11. Nxg6 hxg6 12. Bd3',
      note: 'The same Ne5 and g4 idea as in the Gunderam. White wins the bishop pair and gains kingside space.',
    },
    {
      name: 'Declined, Vienna Defence 4...Bf5',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 Bf5 5. g4 Bg6 6. g5 Nd5 7. Nxe4 e6 8. c4 Nb6 9. c5 Nd5 10. Qa4+ Qd7 11. Bb5 Nc6',
      note: 'Black keeps the e4 pawn for a moment. White chases the pieces with g4–g5 and c4–c5 and wins the pawn back with a space advantage.',
    },
    {
      name: 'Declined, Elbert Countergambit 4...e5',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 e5 5. dxe5 Qxd1+ 6. Kxd1 Ng8 7. Nd5 Kd8 8. fxe4 Ne7 9. Nf3',
      note: 'Black strikes back in the centre and trades queens. The endgame favours White: Nd5 is strong and Black\'s pieces are passive.',
    },
  ],
  traps: [
    {
      name: 'Teichmann: 7...Qxd4? 8.Qxb7',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bg4 6. h3 Bxf3 7. Qxf3 Qxd4 8. Qxb7',
      victim: 'black',
      explanation: 'After ...Bxf3 the b7 pawn is no longer defended. Grabbing d4 lets the queen take b7 and then the rook on a8. Black cannot save both the rook and the b8 knight.',
    },
    {
      name: 'Euwe: 9...Nxd4? 10.Nxd4 Qxd4 11.Bxh7+',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 e6 6. Bg5 Be7 7. Bd3 O-O 8. Qe2 Nc6 9. O-O-O Nxd4 10. Nxd4 Qxd4 11. Bxh7+',
      victim: 'black',
      explanation: 'After White castles long, the rook on d1 stands behind the d3 bishop. When the black queen takes on d4, Bxh7+ is a discovered attack: the bishop checks and the rook takes the queen next move.',
    },
    {
      name: 'Elbert Countergambit: 6...Nfd7? 7.Nd5',
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 e5 5. dxe5 Qxd1+ 6. Kxd1 Nfd7 7. Nd5 Kd8 8. Bg5+ f6 9. exf6 gxf6 10. Nxf6',
      victim: 'black',
      explanation: 'The knight on d7 blocks the king\'s escape. 7.Nd5 threatens Nxc7+, and after 7...Kd8 8.Bg5+ f6 9.exf6 gxf6 10.Nxf6 White wins material. After 6...Ng8 Black is worse, but still in the game.',
    },
  ],
  positions: [
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3',
      note: 'The gambit. 4...exf3 accepts, 4...e6, 4...Bf5, 4...c6 and 4...e5 decline, and 4...e3 gives the pawn back at once to keep the f-file closed.',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3',
      note: 'The main position. Black chooses a defence: 5...Bg4 (Teichmann), 5...e6 (Euwe), 5...g6 (Bogoljubov), 5...Bf5 (Gunderam) or 5...c6 (Ziegler).',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bg4 6. h3 Bxf3 7. Qxf3',
      note: 'The b7 pawn is loose, so 7...Qxd4? runs into 8.Qxb7. After 7...c6 Black is solid and you continue with Bd3 or Be3 and castle.',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bg4 6. h3 Bxf3 7. Qxf3 c6 8. Bd3 e6 9. O-O',
      note: 'Now 9...Qxd4+ is Black\'s most critical try. Engines prefer Black here, but after 10.Be3 or 10.Kh1 White has a big lead in development for the two pawns and the practical chances are good.',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 g6 6. Bc4 Bg7 7. O-O O-O 8. Qe1',
      note: 'Studier Attack: the queen heads for h4. Follow up with Be3 or Bh6 and try to trade the g7 bishop. Note that the queen on h4 also guards d4 along the rank.',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Nxf3 Bf5 6. Ne5',
      note: 'Hunting the bishop. The plan is g2–g4 with tempo. If the bishop goes to e4, take it with the c3 knight.',
    },
    {
      moves: '1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 e3',
      note: 'Black returns the pawn to keep lines closed. Recapture with 5.Bxe3 and play Qd2, O-O-O and g4 for an attack.',
    },
  ],
  modelGames: [],
};

export default opening;
