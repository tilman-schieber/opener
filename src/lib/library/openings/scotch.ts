import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'scotch-game',
  name: 'Scotch Game',
  eco: 'C44–C45',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nc6 3. d4',
  summary:
    'White opens the centre at once with 3.d4, trading the d-pawn for Black\'s e-pawn. The result is free development, an e4 pawn against Black\'s d-pawn, and positions where Black cannot hide behind a closed centre — a favourite of Kasparov.',
  ideas: [
    'After 3...exd4 4.Nxd4 you have a half-open d-file and a strong e4 pawn: develop fast with Nc3, Be3/Bg5, Qd2 and O-O.',
    'In the Mieses line (4...Nf6 5.Nxc6 bxc6 6.e5), push e5 to kick the f6 knight and follow with c4 to deny it the d5 square.',
    'Against 4...Bc5, trade the bishop\'s target: 5.Nxc6 breaks up Black\'s pawns, 5.Nb3 hits the bishop and prepares a4–a5 to harass it.',
    'Aim for the e4–e5 push and an f4 support pawn when Black\'s pieces are passive; it cramps Black and prepares f5 or a kingside attack.',
    'When Black gets doubled c-pawns (after Nxc6 bxc6), put pieces on the queenside light squares and target the c6/c5 and a-pawns in the endgame.',
    'Watch f2 after ...Bc5 and ...Qf6: always check whether ...Qxf2 or ...Bxf2+ works before you develop.',
  ],
  opponentIdeas: [
    'Hit d4 with ...Bc5 and ...Qf6, piling up on f2 and the knight.',
    'Counterattack e4 with ...Nf6 and seek freeing ...d5 breaks to activate the bishops.',
    'Accept doubled c-pawns in exchange for the bishop pair and open b- and d-files.',
  ],
  structure:
    'An open centre: White keeps an e4 pawn (often advanced to e5) with no d-pawn, Black keeps a d-pawn. If White trades on c6, Black gets doubled c-pawns but open lines; the e5 pawn becomes a key strength or target.',
  lines: [
    {
      name: 'Mieses, 8...Ba6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5 Qe7 7. Qe2 Nd5 8. c4 Ba6 9. b3 g6 10. g3 Bg7 11. Bb2 O-O 12. Bg2 Rae8 13. O-O',
      note: 'The main line. White keeps the e5 pawn and finishes development; the pin on the e-file disappears once the king castles.',
    },
    {
      name: 'Mieses, 8...Nb6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5 Qe7 7. Qe2 Nd5 8. c4 Nb6 9. Nd2 Qe6 10. b3 a5 11. Bb2 Bb4 12. a3 Bxd2+ 13. Qxd2 d5 14. cxd5 cxd5',
      note: 'Black pressures c4 and e5 directly; White keeps the bishop pair and a safe space advantage.',
    },
    {
      name: 'Classical 4...Bc5, 5.Nxc6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nxc6 Qf6 6. Qd2 dxc6 7. Nc3 Be6 8. Na4 Rd8 9. Bd3 Bd4 10. O-O Ne7 11. c3 Bb6 12. Nxb6 axb6',
      note: 'Qd2 covers f2; Na4 then chases the dangerous c5 bishop and White keeps a pleasant space edge.',
    },
    {
      name: 'Classical 4...Bc5, 5.Nb3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nb3 Bb6 6. a4 a6 7. Nc3 Nf6 8. Nd5 Nxd5 9. exd5 Ne7 10. a5 Ba7 11. d6 cxd6 12. Qxd6 Nf5 13. Qd3 O-O',
      note: 'White gains queenside space with a4–a5 and uses the d5–d6 thrust to open lines.',
    },
    {
      name: 'Scotch Four Knights',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nc3 Bb4 6. Nxc6 bxc6 7. Bd3 d5 8. exd5 cxd5 9. O-O O-O 10. Bg5 c6 11. Qf3 Be7 12. Rae1',
      note: 'A calmer choice: White pins the f6 knight and builds pressure against Black\'s isolated centre pawns.',
    },
    {
      name: 'Scotch Gambit (4.Bc4)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bc5 5. c3 Nf6 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Nce7 11. O-O O-O 12. Rfe1 c6',
      note: 'An aggressive sideline: after 4...Bc5 5.c3 it transposes to the Giuoco Piano with an isolated d-pawn for White and active pieces.',
    },
  ],
  traps: [
    {
      name: 'Mate on f2',
      moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nxc6 Qf6 6. Bc4 Qxf2#',
      victim: 'white',
      explanation: 'After 5...Qf6 Black threatens mate on f2 (queen plus the c5 bishop). You must defend with 6.Qd2, 6.Qf3 or 6.Qe2 — a natural developing move like 6.Bc4?? loses at once.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nc6 3. d4', note: 'The Scotch: White challenges e5 immediately. 3...exd4 is almost forced; after 4.Nxd4 White has a free, open game.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5', note: 'Black hits d4 and eyes f2. Choose 5.Nxc6 (then Qd2 to cover f2) or 5.Nb3 to gain time on the bishop. 5.Be3 Qf6 6.c3 is also good.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6', note: 'Black attacks e4. 5.Nxc6 bxc6 6.e5 (Mieses) is the most ambitious; 5.Nc3 is the solid Scotch Four Knights.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5 Qe7 7. Qe2', note: 'The queen blocks the pin on the e-file. Next comes c4 to drive the knight from d5 and b3/Bb2 or g3/Bg2 to finish development.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nxc6 Qf6', note: 'Mate is threatened on f2! Play 6.Qd2 (or Qf3/Qe2); then Nc3, Na4 or Bd3 and castle.' },
  ],
  modelGames: [],
};

export default opening;
