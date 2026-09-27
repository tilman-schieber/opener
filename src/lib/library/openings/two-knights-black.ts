import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'two-knights-defense',
  name: 'Two Knights Defense',
  eco: 'C55–C59',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6',
  summary:
    'Against the Italian, Black develops the second knight and immediately counterattacks e4 instead of copying White with ...Bc5. It is a fighting choice: against the aggressive 4.Ng5 Black sacrifices a pawn for rapid development, and against the quiet 4.d3 Black gets a comfortable Ruy-Lopez-like position.',
  ideas: [
    'Against 4.Ng5, play 4...d5 5.exd5 Na5! — hitting the c4 bishop. Never recapture 5...Nxd5?, which allows the Fried Liver sacrifice on f7.',
    'After 5...Na5 you are a pawn down, but you gain tempi chasing White\'s pieces with ...c6, ...h6 and ...e4. Put the bishop on d6, the queen on c7 and castle — you get lasting initiative.',
    'Against 4.d3, play in Ruy Lopez style: ...Be7 (or ...Bc5), ...O-O, ...d6, then ...Na5 to trade the Italian bishop, and ...c5/...b5 to gain queenside space.',
    'Against 4.d4 exd4 5.O-O, take the pawn with 5...Nxe4! and after 6.Re1 d5 give back material to reach a healthy position. 5...Bc5 would allow the Max Lange Attack after 6.e5.',
    'Against 4.d4 exd4 5.e5, strike back with 5...d5! and plant the knight on e4.',
    'Keep an eye on f7: until you have castled, every Ng5 or Bxf7+ must be checked.',
  ],
  opponentIdeas: [
    'Attack f7 with Ng5 and Bc4 while Black\'s king is still in the centre (the Fried Liver after 5...Nxd5?).',
    'Win the d5 pawn after 4.Ng5 d5 5.exd5 and hold on to it.',
    'Open the centre quickly with d4 and use a lead in development (Max Lange, Modern Attack).',
    'Play the slow 4.d3 with c3, Re1, Nbd2–f1–g3 and a4 — the modern Italian approach.',
  ],
  structure:
    'Depends on White\'s 4th move. In the 4.Ng5 d5 lines Black gives a pawn and gets open lines and an advanced e-pawn; White has the extra pawn but lagging development. After 4.d3 the position is the classic closed e4/e5 structure with slow maneuvering.',
  lines: [
    {
      name: '4.Ng5 d5 5.exd5 Na5, main line',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6 9. Nf3 e4 10. Ne5 Bd6 11. d4 exd3 12. Nxd3 Qc7 13. b3 O-O 14. Bb2',
      note: 'The main line: Black is a pawn down but has two bishops, open lines and a lead in development.',
    },
    {
      name: '4.Ng5 d5 5.exd5 Na5 6.d3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. d3 h6 7. Nf3 e4 8. Qe2 Nxc4 9. dxc4 Bc5 10. h3 O-O 11. Nh2',
      note: 'Black takes the bishop pair and pushes ...e4 to cramp White\'s knights.',
    },
    {
      name: 'Quiet 4.d3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Be7 5. O-O O-O 6. Bb3 d6 7. c3 Na5 8. Bc2 c5 9. Nbd2 Nc6 10. Re1 Re8 11. Nf1 Bf8',
      note: 'The modern Italian: slow maneuvering. Black mirrors White and later strikes with ...d5.',
    },
    {
      name: '4.d4 exd4 5.O-O Nxe4 (avoiding the Max Lange)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Nxe4 6. Re1 d5 7. Bxd5 Qxd5 8. Nc3 Qa5 9. Nxe4 Be6 10. Neg5 O-O-O 11. Nxe6 fxe6 12. Rxe6 Bd6',
      note: 'Black keeps the extra d4 pawn and gets active pieces; the main line is roughly balanced.',
    },
    {
      name: '4.d4 exd4 5.e5 d5',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. e5 d5 6. Bb5 Ne4 7. Nxd4 Bd7 8. Bxc6 bxc6 9. O-O Be7 10. f3 Nc5 11. f4 Ne4',
      note: 'The Modern Attack: Black hits back in the centre with ...d5 and the strong knight on e4.',
    },
    {
      name: 'Traxler Counterattack 4...Bc5 (optional)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 Bc5 5. Bxf7+ Ke7 6. Bd5 Rf8 7. O-O d6 8. c3',
      note: 'A wild gambit for fans of chaos. White\'s safest answer is 5.Bxf7+, after which Black relies on activity and the open f-file.',
    },
  ],
  traps: [
    {
      name: 'Fried Liver Attack',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3',
      victim: 'black',
      explanation: '5...Nxd5? lets White sacrifice on f7 and drag your king to e6, where it is attacked by everything. Always play 5...Na5!, hitting the c4 bishop.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6', note: 'Two Knights: you counterattack e4. White chooses between 4.Ng5 (sharp), 4.d3 (quiet) and 4.d4 (open).' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5', note: 'f7 is attacked twice. 4...d5! blocks the bishop — the only good way to defend.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5', note: 'The key moment: 5...Na5! attacks the bishop. 5...Nxd5? allows the Fried Liver (6.Nxf7) or 6.d4.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2', note: 'Keep kicking: 8...h6 9.Nf3 e4 10.Ne5 Bd6. Your development lead is worth more than the pawn.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3', note: 'Quiet Italian. Develop with ...Be7 or ...Bc5, castle, and consider ...Na5 to trade the c4 bishop.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O', note: 'Take with 5...Nxe4! — after 5...Bc5 6.e5 you enter the dangerous Max Lange Attack.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. e5', note: 'Strike back with 5...d5! — the e4 square is now available for your knight.' },
  ],
  modelGames: [],
};

export default opening;
