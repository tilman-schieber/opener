import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'danish-gambit',
  name: 'Danish Gambit',
  eco: 'C21',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 e5 2. d4 exd4 3. c3',
  summary:
    'White offers one pawn, then a second, to get two bishops raking across the board at f7 and g7. After 3...dxc3 4.Bc4 cxb2 5.Bxb2 White is two pawns down but has a huge lead in development, and unprepared opponents often collapse within 15 moves. Well-prepared defenders return material with ...d5, so know when to switch from attack to a healthy endgame.',
  ideas: [
    'After 5.Bxb2 your bishops on c4 and b2 aim straight at f7 and g7. Develop with Nc3, Nf3, O-O and Qe2 or Qb3, and open the centre with e4–e5.',
    'Qb3 hits f7 and b7 at the same time. Against a slow ...d6, the queen and Bc4 pile up on f7 while Ng5 adds a third attacker.',
    'Punish early greed on e4: if Black takes with ...Nxe4 and castles short, Qg4 against g7 (backed by the b2 or c3 bishop) is often immediately decisive.',
    'Against the Schlechter Defence 5...d5, play 6.Bxd5 Nf6 7.Bxf7+ and trade queens. The endgame is roughly equal, so do not avoid it by force.',
    'In the one-pawn version 4.Nxc3, aim Nf3, Bc4 and O-O at f7. If Black plays ...Be6 to trade bishops, hit b7 and e6 with Qb3.',
    'Against 3...d5 (the best way to decline), take with 4.exd5 and recapture on d4 with the c-pawn. You get a normal open game with an isolated d-pawn and quick development.',
    'Keep castling short and bring the rooks to d1 and e1. The open c- and d-files belong to you in most lines.',
  ],
  opponentIdeas: [
    'Give back material at once with 5...d5, reaching an endgame where the two extra pawns become one sound extra tempo.',
    'Develop with checks: ...Bb4+ pins the c3 knight and slows down e4–e5.',
    'Decline with 3...d5 and aim for an open game where the gambit never really starts.',
    'Trade off the c4 bishop with ...Be6 or ...Na5 to kill the pressure on f7.',
  ],
  structure:
    'In the accepted lines White has no c- or d-pawn left and Black has an extra queenside majority. The e4 pawn is White\'s only central pawn, and the c- and d-files are fully open for the rooks. The bishops on b2 and c4 are the whole point: if Black manages to trade one of them and castle safely, the extra pawns start to count; if Black delays, the e4–e5 push and pressure on f7 and g7 decide.',
  lines: [
    {
      name: 'Accepted, Schlechter Defence 5...d5',
      moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 d5 6. Bxd5 Nf6 7. Bxf7+ Kxf7 8. Qxd8 Bb4+ 9. Qd2 Bxd2+ 10. Nxd2 c5 11. Ngf3 Nc6 12. O-O',
      note: 'The critical defence: Black returns the pawns and forces a queenless position. Material is level and the game is roughly equal.',
    },
    {
      name: 'Accepted, 5...d6 with Qb3',
      moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 d6 6. Nc3 Nc6 7. Nf3 Be6 8. Bxe6 fxe6 9. Qb3 Qd7 10. Ng5 Nd8 11. O-O Be7 12. f4',
      note: 'Black blocks the c4 bishop with ...Be6. After 8.Bxe6 fxe6 the e6 pawn and the b7 pawn are targets, and f2–f4–f5 opens more lines.',
    },
    {
      name: 'Accepted, 5...Nf6 with Qc2 and long castling',
      moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 Nf6 6. Nc3 Nc6 7. Nf3 Bb4 8. Qc2 d6 9. O-O-O Bxc3 10. Bxc3 O-O 11. e5',
      note: 'Qc2 protects e4 and prepares O-O-O, so the rook joins the d-file and e4–e5 comes with force.',
    },
    {
      name: 'Göring-style 4.Nxc3 (one pawn)',
      moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Nxc3 Nc6 5. Bc4 d6 6. Nf3 Be6 7. Bxe6 fxe6 8. Qb3 Qd7 9. Qxb7 Rb8 10. Qa6 Nf6 11. O-O Be7',
      note: 'The safer version: only one pawn is sacrificed. Against ...Be6, White trades and grabs b7 back with Qb3.',
    },
    {
      name: 'Declined, 3...d5',
      moves: '1. e4 e5 2. d4 exd4 3. c3 d5 4. exd5 Qxd5 5. cxd4 Nc6 6. Nf3 Bg4 7. Be2 Bb4+ 8. Nc3 Bxf3 9. Bxf3 Qc4 10. Bxc6+ bxc6 11. Qe2+ Qxe2+ 12. Kxe2 O-O-O 13. Be3 Ne7',
      note: 'The most solid answer: Black strikes back in the centre and White gets an isolated d-pawn with active pieces.',
    },
    {
      name: 'Declined, 3...Nf6',
      moves: '1. e4 e5 2. d4 exd4 3. c3 Nf6 4. e5 Nd5 5. cxd4 d6 6. Nf3 Nc6 7. Bc4 Nb6 8. Bb5 dxe5 9. Nxe5 Bd7 10. Nxd7 Qxd7 11. Nc3',
      note: 'Black counterattacks e4. 4.e5 gains space and the structure resembles an Alapin Sicilian.',
    },
    {
      name: 'Declined, 3...d3',
      moves: '1. e4 e5 2. d4 exd4 3. c3 d3 4. Bxd3 d6 5. Nf3 Nf6 6. O-O Be7 7. c4 O-O 8. Nc3 Bg4 9. h3 Bh5 10. Be3',
      note: 'Black refuses to open lines. White simply takes on d3 and gets a free, comfortable space advantage with c4.',
    },
  ],
  traps: [
    {
      name: 'Qg4 against the greedy ...Nxe4',
      moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 Bb4+ 6. Nc3 Nf6 7. Nge2 Nxe4 8. O-O Nxc3 9. Nxc3 Bxc3 10. Bxc3 O-O 11. Qg4 g6 12. Qd4',
      victim: 'black',
      explanation: 'Black grabs a third pawn and castles into the two bishops. 11.Qg4 threatens Qxg7#. After 11...g6 12.Qd4 White mates on h8 or g7, and 11...Qf6 12.Bxf6 loses the queen. Black had to castle on move 7 instead of taking on e4.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. d4 exd4 3. c3', note: 'The gambit is offered. Black chooses between 3...dxc3 (accept), 3...d5 (the best decline) and the sidelines 3...Nf6 and 3...d3.' },
    { moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3', note: '4.Bc4 offers a second pawn (the real Danish). 4.Nxc3 keeps it to one pawn and gives a Göring Gambit.' },
    { moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2', note: 'Two pawns down, two bishops aimed at f7 and g7. Black\'s best is 5...d5, giving the material back. Anything slow (5...d6, 5...Nf6) lets you build up with Nc3, Nf3, O-O and Qe2/Qb3.' },
    { moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 d5 6. Bxd5 Nf6 7. Bxf7+ Kxf7 8. Qxd8', note: 'Black must interpose with 8...Bb4+ and trade on d2. The endgame is equal: activate the king and play for e4–e5 and Nd4.' },
    { moves: '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 Nf6', note: 'Do not rush 6.e5? here: 6...Bb4+ forces the king to move and ...d5 hits the c4 bishop. Develop first with 6.Nc3.' },
    { moves: '1. e4 e5 2. d4 exd4 3. c3 d5', note: 'The best decline. After 4.exd5 Qxd5 5.cxd4 you have an isolated d-pawn but easy development. 4.exd5 Nf6 is also possible for Black.' },
  ],
  modelGames: [],
};

export default opening;
