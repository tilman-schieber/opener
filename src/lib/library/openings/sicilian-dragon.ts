import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'sicilian-dragon',
  name: 'Sicilian Dragon',
  eco: 'B70–B79',
  side: 'black',
  group: 'black-e4',
  difficulty: 3,
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6',
  summary:
    'Black fianchettoes the king\'s bishop on g7, where it breathes fire down the long diagonal at White\'s queenside. Against the aggressive Yugoslav Attack both sides castle on opposite wings and race to mate; in quieter lines Black gets easy development and pressure on the c-file.',
  ideas: [
    'The g7 bishop is your best piece: point everything at c3 and b2. Never trade it lightly — without it your king and dark squares are naked.',
    'Standard development: ...Bg7, ...O-O, ...Nc6, ...Bd7 (or ...Be6), ...Rc8, ...Qa5 and ...Ne5–c4 to hit the Qd2/Be3 battery.',
    'The exchange sacrifice ...Rxc3 is the Dragon\'s trademark: bxc3 shatters White\'s king cover and your bishop on g7 becomes a monster.',
    'Push ...b5–b4 (sometimes as a pawn sacrifice) to open lines toward White\'s king on c1/b1.',
    'Against h4–h5 in the Yugoslav, consider ...h5 (Soltis Variation) to slow White\'s storm, or capture ...Nxh5 when the h-file does not open dangerously.',
    'Against the quiet Classical 6.Be2, play ...O-O, ...Nc6, ...Be6 and look for ...d5 or ...Na5–c4 — you are comfortable here.',
  ],
  opponentIdeas: [
    'Yugoslav Attack: Be3, f3, Qd2, O-O-O, then h4–h5 to open the h-file and Bh6 to exchange your dragon bishop — "pry open the h-file, sac, sac, mate".',
    'Plant a knight on d5 to trade off your f6 knight, the key defender of h7.',
    'The Bc4–b3 bishop controls d5 and x-rays toward g8; it also stops ...d5.',
    'In the Levenfish (6.f4) White threatens e4–e5 at once, before Black has castled.',
  ],
  structure:
    'Black has pawns on d6, e7 and a fianchetto (f7-g6-h7); White has the e4 pawn and the half-open d-file. The c-file belongs to Black. The critical factor is king safety: the g6 pawn is the "hook" White\'s h-pawn attacks, while Black\'s pawns (and rooks on the c-file) go after the c3 knight and b2.',
  lines: [
    {
      name: 'Yugoslav Attack, 9.Bc4 main line',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7 10. O-O-O Rc8 11. Bb3 Ne5 12. Kb1 Nc4 13. Bxc4 Rxc4 14. g4 b5',
      note: 'The main battleground: Black trades the b3 bishop via ...Ne5–c4 and launches ...b5–b4.',
    },
    {
      name: 'Yugoslav, Soltis Variation (12.h4 h5)',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7 10. O-O-O Rc8 11. Bb3 Ne5 12. h4 h5 13. Bg5 Rc5 14. Kb1 Re8',
      note: '...h5 stops White\'s h-pawn in its tracks; the c5 rook guards the fifth rank and eyes the c3 knight.',
    },
    {
      name: 'Yugoslav, 9.O-O-O d5',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. O-O-O d5 10. exd5 Nxd5 11. Nxc6 bxc6 12. Bd4 Bxd4 13. Qxd4 Qb6 14. Na4 Qc7 15. Bc4 Nb6',
      note: 'Without Bc4 White cannot stop the immediate ...d5 break, which frees Black\'s game.',
    },
    {
      name: 'Classical, 6.Be2',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be2 Bg7 7. O-O O-O 8. Be3 Nc6 9. Nb3 Be6 10. f4 Na5 11. f5 Bc4 12. Nxa5 Bxe2 13. Qxe2 Qxa5 14. g4 Rac8',
      note: 'A calmer line: White attacks with f- and g-pawns, Black counters on the c-file and against e4.',
    },
    {
      name: 'Levenfish, 6.f4',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. f4 Nbd7 7. Nf3 Qc7 8. Bd3 a6 9. O-O b5 10. Qe1 Bb7 11. Kh1 Bg7',
      note: '6...Nbd7! stops e4–e5 by covering it; Black delays the fianchetto until the centre is secure.',
    },
  ],
  traps: [
    {
      name: '6.Be3 Ng4? 7.Bb5+!',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Ng4 7. Bb5+ Bd7 8. Qxg4 Bxb5 9. Ndxb5',
      victim: 'black',
      explanation: 'Kicking the bishop with ...Ng4 works in the Najdorf (where ...a6 covers b5), but not in the Dragon: the check on b5 deflects the d7 defender and White simply wins the g4 knight.',
    },
    {
      name: 'Levenfish: early ...Bg7?',
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. f4 Bg7 7. e5 dxe5 8. fxe5 Nfd7 9. e6 fxe6 10. Nxe6',
      victim: 'black',
      explanation: 'Against 6.f4 the routine 6...Bg7 allows 7.e5!. After 9.e6 the knight fork on e6 hits the queen and the g7 bishop. Play 6...Nbd7 instead.',
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6', note: 'The Dragon. The bishop goes to g7. White\'s most testing answer is the Yugoslav Attack with Be3, f3, Qd2 and O-O-O.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6', note: 'White\'s Qd2/Be3 battery wants Bh6 to trade your bishop. Every move from here is part of the race.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4', note: 'The bishop stops ...d5. Standard answer: ...Bd7, ...Rc8, ...Ne5 and ...Nc4 (or ...Qa5), preparing ...Rxc3 ideas.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. O-O-O', note: 'Without the bishop on c4, strike at once with 9...d5! — it\'s a sound pawn offer that frees your whole game.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. f4', note: 'Levenfish: e4–e5 is threatened. 6...Nbd7 keeps e5 under control; 6...Bg7? runs into 7.e5.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be2', note: 'Classical: no immediate attack. Castle, play ...Nc6 and ...Be6 or ...d5 — Black equalises comfortably.' },
  ],
  modelGames: [
    { white: 'Anatoly Karpov', black: 'Viktor Korchnoi', year: 1974, event: 'Candidates Final, Moscow (game 2)', lesson: 'The textbook Yugoslav Attack win: h4–h5, trading the dragon bishop and crashing through on the h-file. Study it to understand exactly what you must prevent as Black.' },
  ],
};

export default opening;
