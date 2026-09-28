import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'englund-gambit',
  name: 'Englund Gambit',
  eco: 'A40',
  side: 'black',
  group: 'black-d4',
  difficulty: 1,
  base: '1. d4 e5',
  summary:
    'Black throws the e-pawn at d4 on move one and hopes White grabs it. Let\'s be honest: the Englund is unsound, and a White player who knows 6.Nc3 (or 4.Qd5 and 4.Nc3 earlier) is simply better. It survives because the natural moves lose on the spot, and the 8...Qc1# trap has ended thousands of blitz games.',
  ideas: [
    'After 2.dxe5 Nc6 3.Nf3 Qe7 you attack e5 twice (knight and queen). White must defend it or give it back.',
    'The point of ...Qe7 is ...Qb4+: a check that forks the king and the b2 pawn. It only works if White defends with Bd2, and then only against the careless 6.Bc3??.',
    'Aim at the c1 square. With White\'s queen on c3 or d2 and the rook on a1, ...Qxb2 and ...Qc1# is the dream.',
    'If the trap fails, don\'t keep grabbing pawns. Develop with ...Nh6 or ...Nge7, ...d6 and castle, and accept a slightly worse game.',
    'The Soller Gambit 2...d6 is the sounder cousin: after 3.exd6 Bxd6 you are a pawn down but developed and ready for ...Nf6, ...O-O and ...Re8.',
    'Against 2.d5 you get a normal game: ...Bc5, ...d6 and a ...f7–f5 break, like a reversed Old Indian.',
  ],
  opponentIdeas: [
    'The cleanest answer to 4.Bf4 Qb4+ is 5.Bd2 Qxb2 6.Nc3!: the knight comes out with tempo and after 7.Rb1 Black\'s queen is in danger.',
    '4.Qd5 simply defends e5 and keeps the extra pawn without any risk.',
    '4.Nc3 returns the pawn for a big lead in development after 4...Nxe5 5.e4.',
    'The simplest of all is 2.e4, which turns the game into a normal King\'s pawn opening where Black has nothing special.',
  ],
  structure:
    'After 2.dxe5 White has an extra pawn on e5 and the d-file is open. Black has no centre pawns at all, so everything depends on piece activity: the queen on e7 or b4, the c6 knight and quick development. If Black wins e5 back, the position becomes an open game with an equal pawn count but White ahead in development.',
  lines: [
    {
      name: 'Main line, 4.Bf4 Qb4+ 5.Bd2 Qxb2 6.Nc3',
      moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Bf4 Qb4+ 5. Bd2 Qxb2 6. Nc3 Bb4 7. Rb1 Qa3 8. Nd5 Ba5 9. Rb5 Bxd2+ 10. Qxd2 Kd8 11. Ng5 Nh6 12. e4',
      note: 'The trap line when White knows the answer: 6.Nc3 develops with tempo and Black\'s queen gets hunted. Black is in real trouble here, so know the trap but don\'t expect it to work every time.',
    },
    {
      name: '4.Qd5 (keeping the pawn)',
      moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Qd5 f6 5. exf6 Nxf6 6. Qb3 d5 7. Nc3 a5 8. Bd2 Qf7 9. e3 Be7 10. Bd3 O-O 11. O-O a4',
      note: 'White defends e5 with the queen. Black opens the f-file with ...f6, castles and uses ...a5–a4 to harass the queen. Black is a pawn down but active.',
    },
    {
      name: '4.Nc3 (giving the pawn back)',
      moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Nc3 Nxe5 5. e4 c6 6. Be2 Nf6 7. O-O Nxf3+ 8. Bxf3 d6 9. Bf4 Nd7 10. Qd2',
      note: 'Material is level, but White leads in development. Black has to play carefully with ...d6, ...Nd7 and ...Be7.',
    },
    {
      name: 'Soller Gambit, 2...d6',
      moves: '1. d4 e5 2. dxe5 d6 3. exd6 Bxd6 4. Nf3 Nf6 5. Bg5 h6 6. Bh4 Qe7 7. Bxf6 Qxf6 8. Qd4 Qg6 9. Nc3 O-O',
      note: 'A more honest gambit: a pawn for quick development and open lines.',
    },
    {
      name: '2.d5',
      moves: '1. d4 e5 2. d5 Bc5 3. e4 d6 4. Nf3 f5 5. exf5 Bxf5 6. Nc3 Nf6 7. Bd3 e4 8. Nh4',
      note: 'White closes the centre. Black gets free development and the ...f5 break.',
    },
    {
      name: '2.e4: into a Center Game',
      moves: '1. d4 e5 2. e4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6 5. Nc3 Bb4 6. Bd2 O-O 7. O-O-O Re8 8. Bc4 d6 9. Nf3 Be6 10. Bxe6 Rxe6 11. Ng5 Re8',
      note: 'After 2.e4 the gambit is gone and you are in an ordinary 1.e4 e5 position. Take on d4 and develop with tempo against the queen.',
    },
  ],
  traps: [
    {
      name: 'The Englund trap: 6.Bc3?? Bb4! and 8...Qc1#',
      moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Bf4 Qb4+ 5. Bd2 Qxb2 6. Bc3 Bb4 7. Qd2 Bxc3 8. Qxc3 Qc1#',
      victim: 'white',
      explanation: '6.Bc3 attacks the queen and looks natural. But 6...Bb4! pins the bishop to the king. The natural 7.Qd2 defends, yet after 7...Bxc3 8.Qxc3 the queen has left d1 and 8...Qc1# is mate on the back rank. White should play 6.Nc3.',
    },
  ],
  positions: [
    { moves: '1. d4 e5', note: 'The Englund: a pawn offer on move one. 2.dxe5 accepts, 2.e4 turns it into an e4 opening, and 2.d5 closes the centre.' },
    { moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7', note: 'Black hits e5 twice. 4.Bf4 walks into ...Qb4+. Safer are 4.Qd5 or 4.Nc3.' },
    { moves: '1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Bf4 Qb4+ 5. Bd2 Qxb2', note: 'The critical moment. 6.Bc3?? Bb4! leads to ...Qc1#. 6.Nc3! is the refutation: 6...Bb4 7.Rb1 and the queen is in trouble.' },
    { moves: '1. d4 e5 2. dxe5 d6', note: 'Soller Gambit: 3.exd6 Bxd6 gives Black easy development. It is the more solid way to gambit here.' },
    { moves: '1. d4 e5 2. e4', note: 'No gambit any more. 2...exd4 3.Qxd4 Nc6 is a Center Game, and 3.c3 is a Danish Gambit.' },
  ],
  modelGames: [],
};

export default opening;
