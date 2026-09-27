import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'kings-gambit',
  name: 'King\'s Gambit',
  eco: 'C30–C39',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 e5 2. f4',
  summary:
    'The most romantic opening: White offers the f-pawn to deflect Black\'s e-pawn, build a pawn centre with d4 and open the f-file toward f7. Play is sharp from move two, and both kings can come under fire.',
  ideas: [
    'After 2...exf4 3.Nf3, the knight stops ...Qh4+ and prepares d4 to grab the full centre.',
    'Undermine Black\'s pawn chain f4/g5 with h2–h4: if ...g4, the knight jumps to e5 (Kieseritzky) and the g-pawn becomes a target.',
    'Win back the f4 pawn with Bxf4 once the g5 pawn is gone — you then have the half-open f-file and a lead in development.',
    'Aim everything at f7: Bc4, Rf1 after castling and Ng5 ideas. The f-file is your highway.',
    'In the King\'s Gambit Declined (2...Bc5) do not take on e5 at once; play Nf3, Nc3, Bc4 and d3, then prevent ...Bg4 with h3 or c3/d4 to neutralise the bishop on c5.',
    'Against the Falkbeer (2...d5 3.exd5 e4), attack the e4 pawn with d3 and Qe2 — it becomes weak once Black\'s pieces commit.',
  ],
  opponentIdeas: [
    'Hold on to the extra pawn with ...g5 (and ...h6/...Bg7), building a kingside wedge.',
    'Return the pawn with an early ...d5 or ...Nf6 counterattack to open lines against White\'s king.',
    'Decline with 2...Bc5, controlling g1 so that White cannot easily castle kingside.',
    'Use ...Qh4+ checks when the f2 square and e1–h4 diagonal are open.',
  ],
  structure:
    'White trades the f-pawn for Black\'s e-pawn, often leaving a d4/e4 centre against a black pawn on f4 (supported by g5). If White regains f4, the half-open f-file and central majority give a lasting initiative; if not, Black\'s kingside pawns cramp White.',
  lines: [
    {
      name: 'Kieseritzky Gambit (3...g5 4.h4 g4 5.Ne5)',
      moves: '1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6 7. Nd3 Nxe4 8. Bxf4 Bg7 9. c3 Qe7 10. Qe2 Bf5 11. Nd2',
      note: 'White breaks up the kingside pawns with h4 and regains the f4 pawn; the main battle is for the e-file.',
    },
    {
      name: 'Fischer Defence (3...d6)',
      moves: '1. e4 e5 2. f4 exf4 3. Nf3 d6 4. d4 g5 5. h4 g4 6. Ng1 f3 7. gxf3 Be7 8. Be3 Bxh4+ 9. Kd2 gxf3 10. Qxf3',
      note: 'Fischer\'s 3...d6 takes e5 from the knight. White retreats the knight and uses the open files and a big centre.',
    },
    {
      name: 'Modern Defence (3...d5)',
      moves: '1. e4 e5 2. f4 exf4 3. Nf3 d5 4. exd5 Nf6 5. Bb5+ c6 6. dxc6 Nxc6 7. d4 Bd6 8. O-O O-O 9. Nbd2',
      note: 'Black gives back the pawn for easy development; White aims Nd2–c4 and pressure on f4.',
    },
    {
      name: 'King\'s Gambit Declined, 2...Bc5',
      moves: '1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. Nc3 Nf6 5. Bc4 Nc6 6. d3 Bg4 7. h3 Bxf3 8. Qxf3 exf4 9. Bxf4 Nd4 10. Qg3',
      note: 'Develop calmly and get the bishop pair; the f-file and the long diagonal toward f7 give White pressure.',
    },
    {
      name: 'Falkbeer Counter-Gambit (2...d5)',
      moves: '1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Nf3 Bc5 7. Qe2 Bf5 8. Nc3 Qe7 9. Be3 Bxe3 10. Qxe3 Nxc3 11. Qxe7+ Kxe7 12. bxc3',
      note: 'White removes the e4 wedge with d3 and reaches a queenless middlegame; Black usually regains the pawn with ...Bxc2, but the d5 pawn and quick development keep White comfortable.',
    },
  ],
  traps: [
    {
      name: 'KGD: 3.fxe5?? Qh4+',
      moves: '1. e4 e5 2. f4 Bc5 3. fxe5 Qh4+ 4. g3 Qxe4+ 5. Qe2 Qxh1',
      victim: 'white',
      explanation: 'Taking on e5 against 2...Bc5 opens the e1–h4 diagonal. After 4.g3 Qxe4+ the queen forks king and rook. Play 3.Nf3 first.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. f4', note: 'The King\'s Gambit. White offers a pawn to deflect e5 and play d4. Main replies: 2...exf4 (accepted), 2...Bc5 (declined) and 2...d5 (Falkbeer).' },
    { moves: '1. e4 e5 2. f4 exf4 3. Nf3', note: 'The knight covers h4 against ...Qh4+ and prepares d4. Black chooses between 3...g5, 3...d6 (Fischer) and 3...d5 / 3...Nf6.' },
    { moves: '1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4', note: 'Undermine the g5 pawn before Black consolidates with ...Bg7 and ...h6. After 4...g4 play 5.Ne5.' },
    { moves: '1. e4 e5 2. f4 Bc5', note: 'Don\'t take on e5 — 3.fxe5?? Qh4+ loses. Play 3.Nf3, then Nc3, Bc4, d3; c3 and d4 can blunt the bishop.' },
    { moves: '1. e4 e5 2. f4 d5 3. exd5 e4', note: 'The Falkbeer: Black\'s e4 pawn cramps White. Attack it immediately with 4.d3.' },
  ],
  modelGames: [
    { white: 'Boris Spassky', black: 'Bobby Fischer', year: 1960, event: 'Mar del Plata', lesson: 'Kieseritzky Gambit: White\'s open lines and active pieces beat a young Fischer — the loss that inspired Fischer\'s 3...d6 "refutation".' },
  ],
};

export default opening;
