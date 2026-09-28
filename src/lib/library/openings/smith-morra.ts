import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'smith-morra',
  name: 'Smith-Morra Gambit',
  eco: 'B21',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 c5 2. d4 cxd4 3. c3',
  summary:
    'An anti-Sicilian pawn sacrifice: White gives the c-pawn for fast development and open c- and d-files. The standard setup Nc3, Nf3, Bc4, O-O, Qe2 and Rd1 is easy to learn, and Sicilian players who only know their Najdorf often walk into tactics on d6, c7 and f7.',
  ideas: [
    'Use the same setup almost every game: Nxc3, Nf3, Bc4, O-O, Qe2, Rd1, then Bf4 or Be3 and Rac1. Your rooks on c1 and d1 are the compensation for the pawn.',
    'The d6 pawn is a target on the open d-file. Nb5 hits d6 and c7, and e4–e5 opens the file against it.',
    'Watch for e4–e5 as a tactical shot whenever Black\'s knight is on f6 and the d6 pawn is pinned or overloaded.',
    'Keep the c4 bishop on the a2–g8 diagonal. Against ...a6 and ...b5 retreat to b3; it still hits e6 and f7, where Nd5 sacrifices often land.',
    'Play h3 early when Black has ...Qc7 and ...Ng4 or ...Bg4 ideas, but only when it does not walk into a tactic on h2.',
    'Against the declines (3...Nf6, 3...d5) you get an Alapin Sicilian. Take back on d4 with the c-pawn and play normal, quick development.',
  ],
  opponentIdeas: [
    'Accept and consolidate: ...Nc6, ...d6, ...e6, ...Nf6, ...Be7 and ...O-O, then keep the extra pawn into the endgame.',
    'The Siberian setup (...e6, ...Qc7, ...Nf6) with a counterattack on h2 via ...Ng4 and ...Nd4.',
    'The Chicago setup with ...a6, ...b5, ...Ra7 and ...Rd7 to neutralise the d-file.',
    'Decline with 3...Nf6 or 3...d5, reaching an Alapin Sicilian where the gambit never happens.',
  ],
  structure:
    'After 3...dxc3 4.Nxc3 White has only the e4 pawn in the centre while Black keeps an extra central pawn (usually d6 and e6). The c- and d-files are open for White\'s rooks, and Black\'s d6 pawn is backward. If Black consolidates with ...O-O and ...Qc7, the extra pawn matters; if not, White\'s initiative on the half-open files and against f7 decides.',
  lines: [
    {
      name: 'Classical: ...Nc6, ...d6, ...e6, ...Be7',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 e6 7. O-O Nf6 8. Qe2 Be7 9. Rd1 e5 10. h3 O-O 11. Be3 Be6 12. Bxe6 fxe6 13. Rac1',
      note: 'The main line: Black closes the d-file with ...e5 and White trades the light-squared bishops, then builds pressure on the c- and d-files.',
    },
    {
      name: 'Siberian setup: ...e6, ...Qc7, ...Ng4',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 e6 6. Bc4 Qc7 7. O-O Nf6 8. Qe2 Ng4 9. Rd1 a6 10. h3 Nge5 11. Bf4 d6 12. Bb3 Be7 13. Rac1',
      note: 'After 8...Ng4 the move h3 is only safe once the h2 threat is gone. 9.Rd1 first, then h3 kicks the knight to e5, and Bf4 pins it to the c7 queen.',
    },
    {
      name: 'Chicago Defence: ...a6, ...b5, ...Ra7',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 e6 5. Nf3 a6 6. Bc4 b5 7. Bb3 d6 8. O-O Ra7 9. Qe2 Rd7 10. Rd1 Nf6 11. Bg5 Be7',
      note: 'Black uses the rook on the second rank to defend d6. The Bb3 still eyes e6, and e4–e5 is the thematic break.',
    },
    {
      name: 'Declined 3...Nf6 (Alapin structure)',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 Nf6 4. e5 Nd5 5. cxd4 d6 6. Nf3 Nc6 7. Bc4 Nb6 8. Bb5 dxe5 9. Nxe5 Bd7 10. Nxd7 Qxd7 11. Nc3 e6 12. O-O Be7 13. Qg4',
      note: 'This transposes to a main-line Alapin Sicilian. White gets an isolated d-pawn and quick kingside pressure with Qg4.',
    },
    {
      name: 'Declined 3...d5',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 d5 4. exd5 Qxd5 5. cxd4 Nc6 6. Nf3 Bg4 7. Be2 e6 8. Nc3 Qa5 9. O-O Nf6 10. h3 Bh5 11. Be3 Be7 12. a3',
      note: 'Another Alapin transposition. White has the isolated d-pawn, more space and easy piece play.',
    },
    {
      name: 'Declined 3...d3',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 d3 4. Bxd3 Nc6 5. c4 d6 6. Nf3 g6 7. O-O Bg7 8. Nc3 Nf6 9. h3 O-O 10. Be3',
      note: 'Black gives back the pawn to avoid the gambit. White builds a Maroczy Bind with c4 and gets a pleasant space advantage.',
    },
  ],
  traps: [
    {
      name: 'Siberian Trap',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 e6 6. Bc4 Qc7 7. O-O Nf6 8. Qe2 Ng4 9. h3 Nd4 10. Nxd4 Qh2#',
      victim: 'white',
      explanation: 'The automatic 9.h3?? kicks the knight but loses at once: 9...Nd4! hits the e2 queen and deflects the f3 knight, which is the only piece guarding h2. Taking on d4 allows ...Qh2#, and a queen move allows ...Nxf3+ followed by ...Qh2#. Play 9.Rd1 or 9.Nb5 first.',
    },
    {
      name: 'e5 and Bxf7+ against ...Nxe5',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 Nf6 7. e5 Nxe5 8. Nxe5 dxe5 9. Bxf7+ Kxf7 10. Qxd8',
      victim: 'black',
      explanation: 'With the knight on f6 and the d-file open, 7.e5! is a strong push. 7...Nxe5?? 8.Nxe5 dxe5 9.Bxf7+ wins the queen on d8, because the d6 pawn no longer shields it. Black must answer 7.e5 with 7...dxe5 8.Qxd8+ Nxd8 or retreat the knight.',
    },
    {
      name: 'Nb5 against the misplaced ...Bd6',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 e6 6. Bc4 Qc7 7. O-O Nf6 8. Qe2 Bd6 9. Nb5 Qb8 10. Nxd6+ Qxd6 11. e5 Qe7 12. exf6',
      victim: 'black',
      explanation: 'In the Siberian setup the bishop does not belong on d6. 9.Nb5 hits the c7 queen and the d6 bishop, and after the trade on d6 11.e5 forks the queen and the f6 knight. White wins a piece.',
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. d4 cxd4 3. c3', note: 'The gambit. 3...dxc3 accepts. 3...Nf6 and 3...d5 decline into an Alapin, and 3...d3 returns the pawn.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3', note: 'One pawn down, you lead in development. Standard plan: Nf3, Bc4, O-O, Qe2, Rd1, then Bf4 or Be3 and Rac1.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 Nf6', note: 'An early ...Nf6 before ...e6 invites 7.e5!. Black must not take with the knight on e5 because of Bxf7+ and Qxd8.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 e6 6. Bc4 Qc7 7. O-O Nf6 8. Qe2 Ng4', note: 'The Siberian: ...Ng4 and ...Qc7 both aim at h2, and ...Nd4 would remove the f3 defender. Do not play h3 yet. 9.Rd1 is safe.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 e6 7. O-O Nf6 8. Qe2 Be7 9. Rd1', note: 'The full classical setup. Black usually plays ...e5 to close the d-file or ...O-O and ...Qc7. White continues with h3, Be3 or Bf4 and Rac1.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 Nf6 4. e5 Nd5', note: 'Now an Alapin Sicilian. 5.cxd4 gives an isolated d-pawn with active play; 5.Nf3 and 5.Bc4 are also common.' },
  ],
  modelGames: [],
};

export default opening;
