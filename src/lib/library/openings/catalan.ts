import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'catalan',
  name: 'Catalan Opening',
  eco: 'E01–E09',
  side: 'white',
  group: 'white-d4',
  difficulty: 3,
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  summary:
    'A Queen\'s Gambit with a fianchettoed king\'s bishop. The Bg2 bears down the long diagonal on b7 and a8, so even when Black grabs the c4 pawn, White gets lasting queenside pressure. A positional favourite of Kramnik and Carlsen.',
  ideas: [
    'The Bg2 is your star piece: keep the long diagonal open and aim it at b7/a8 — Black\'s light-squared bishop and queenside are often tied up for the whole game.',
    'If Black takes on c4, don\'t hurry: Qc2 (or Qa4+) and a4 regain the pawn with interest, and a4 stops ...b5 from defending it.',
    'Against the Closed Catalan, prepare e2–e4 with Qc2, Nbd2 (or Rd1/Nc3) and b3/Bb2 to gain central space.',
    'Use the c-file and the queenside: Rc1, Rd1, and Ne5 ideas to hit c6 and the d7 knight.',
    'Put the dark-squared bishop on f4 or b2 — don\'t let it be traded cheaply unless you win time with the recapture (Qxd2 after ...Bb4+ Bd2 Bxd2+).',
    'When queens come off, the Catalan bishop and the pressure on b7/c6 often give a long, safe endgame edge.',
  ],
  opponentIdeas: [
    'Take on c4 and try to hold it with ...b5 and ...Bb7, or give it back for easy development.',
    'Free the position with ...c5 (Open) or ...c6/...b6/...Bb7 and later ...c5 (Closed).',
    'Use ...Bb4+ to exchange the dark-squared bishops or misplace White\'s pieces.',
  ],
  structure:
    'Queen\'s Gambit pawns (White d4/c4 vs Black d5/e6) with a white fianchetto. If Black plays ...dxc4 the long diagonal opens fully; in the Closed lines White aims for e4 and a space edge while Black waits for ...c5 or ...e5 to free the game.',
  lines: [
    {
      name: 'Open Catalan, 5...Be7 (7.Qc2)',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 Be7 6. O-O O-O 7. Qc2 a6 8. a4 Bd7 9. Qxc4 Bc6 10. Bf4 a5 11. Nc3 Na6',
      note: 'The main line: White regains the pawn with Qc2/Qxc4 and a4; Black trades off the Catalan bishop with ...Bc6.',
    },
    {
      name: 'Open Catalan, 5...c5 6.O-O Nc6 7.Qa4',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 c5 6. O-O Nc6 7. Qa4 cxd4 8. Nxd4 Qxd4 9. Bxc6+ Bd7 10. Rd1 Qxd1+ 11. Qxd1 Bxc6',
      note: 'A forcing line: Black gets rook, bishop and a pawn for the queen; White has the more flexible queen versus Black\'s pieces.',
    },
    {
      name: 'Open Catalan, 5...Bb4+',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 Bb4+ 6. Bd2 a5 7. Qc2 Bxd2+ 8. Qxd2 c6 9. a4 b5 10. axb5 cxb5 11. Qg5 O-O 12. Qxb5 Ba6 13. Qa4',
      note: 'Black trades the dark bishops and holds c4 with ...b5; 11.Qg5! forks g7 and b5 to win the pawn back.',
    },
    {
      name: 'Closed Catalan (4...Be7)',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. Nbd2 b6 9. e4 Bb7 10. b3 Rc8 11. Bb2 Qc7 12. Rad1',
      note: 'White prepares and plays e4 for a space advantage; Black waits for ...c5 or ...dxe4 and ...c5.',
    },
    {
      name: '4...Bb4+ 5.Bd2 Be7',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Bb4+ 5. Bd2 Be7 6. Nf3 O-O 7. O-O c6 8. Qc2 b6 9. Bf4 Ba6 10. Nbd2 Nbd7 11. Rfd1',
      note: 'Black lures the bishop to d2, where it blocks the knight; White simply redeploys it to f4.',
    },
  ],
  traps: [
    {
      name: 'Holding c4 with ...b5 in the Open Catalan',
      moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 b5 6. Ne5 c6 7. Nxc6 Nxc6 8. Bxc6+ Bd7 9. Bxa8',
      victim: 'black',
      explanation: 'The long diagonal is the Catalan\'s point: 5...b5? 6.Ne5 hits a8 through c6. After 6...c6 7.Nxc6! Nxc6 8.Bxc6+ Bd7 9.Bxa8 White wins the exchange.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 e6 3. g3', note: 'The Catalan: the bishop goes to g2 to pressure d5 and the b7/a8 diagonal. After 3...d5 4.Bg2, Black chooses between ...dxc4 (Open) and ...Be7 (Closed).' },
    { moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4', note: 'The Open Catalan. Continue 5.Nf3 and castle; get the pawn back with Qc2/Qa4 and a4 rather than rushing.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 Be7 6. O-O O-O 7. Qc2 a6', note: 'Black threatens ...b5 to keep the pawn. 8.a4 stops it; then Qxc4 next.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6', note: 'Closed Catalan. Prepare e4 with Nbd2 (or Rd1 and Nc3); b3 and Bb2 complete development.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Bb4+', note: 'Block with 5.Bd2. If Black trades on d2, recapture with the queen or knight and keep the Catalan bishop aiming at the queenside.' },
  ],
  modelGames: [],
};

export default opening;
