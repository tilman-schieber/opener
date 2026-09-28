import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'budapest-gambit',
  name: 'Budapest Gambit',
  eco: 'A51–A52',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 Nf6 2. c4 e5',
  summary:
    'Black answers the Queen\'s pawn with an immediate counterpunch: 2...e5 offers a pawn that Black usually wins back on e5. It is not quite as sound as the main defences, but it is a respectable club weapon with quick development, clear plans and a famous mating trap on d3.',
  ideas: [
    'After 3.dxe5 Ng4 the e5 pawn is attacked by the knight and then by ...Nc6. You usually regain it within a few moves.',
    'The check ...Bb4+ is a key resource. After Nbd2 you pile up with ...Qe7 and ...Ngxe5, and after Nc3 you often double White\'s pawns with ...Bxc3+.',
    'Plant a knight on e5. From there it eyes d3 and f3, and White has no pawn to kick it away quickly.',
    'The rook lift ...a7–a5 and ...Ra8–a6–h6 (or g6) is a Budapest speciality: the rook swings to the kingside for an attack.',
    'Against 4.Bf4, watch the d3 square. If White ever plays axb4 while your queen and knight point at d3, ...Nd3# can happen.',
    'Against the Alekhine 4.e4, go back with ...Nxe5 and hit the big centre with ...Bb4+, ...Qe7 and later ...d6 and ...f5.',
  ],
  opponentIdeas: [
    'Return the pawn calmly and use the space: e3, Be2, O-O and a quick Qc2 or Qd5 to pressure e5 and the queenside.',
    'Keep the bishop pair. After ...Bb4+ many strong players prefer Nbd2 and a3 to force ...Bxd2+.',
    'Grab space with 4.e4 and f2–f4 (Alekhine Variation) and try to push Black back.',
    'Against the Fajarowicz 3...Ne4, keep it simple with Nf3, a3 and Qc2, and the knight on e4 becomes a target.',
  ],
  structure:
    'After White\'s dxe5 and Black\'s recapture, the centre is half open: White has a c4 pawn and often e3, Black has d7 and c7. White usually has more space and a queenside majority, while Black has active pieces and an e5 outpost. Play revolves around the e5 knight, the d-file and Black\'s kingside counterplay.',
  lines: [
    {
      name: 'Main line, 4.Bf4 Nc6 5.Nf3 Bb4+ 6.Nbd2',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4 Nc6 5. Nf3 Bb4+ 6. Nbd2 Qe7 7. a3 Ngxe5 8. Nxe5 Nxe5 9. e3 Bxd2+ 10. Qxd2 d6 11. Be2 O-O 12. O-O a5 13. Qc3 Re8',
      note: 'Black gets the pawn back and trades the b4 bishop for the d2 knight. With ...a5 and ...Re8 Black has a solid, active setup.',
    },
    {
      name: '4.Bf4 Nc6 5.Nf3 Bb4+ 6.Nc3',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4 Nc6 5. Nf3 Bb4+ 6. Nc3 Qe7 7. Qd5 Bxc3+ 8. bxc3 f6 9. exf6 Nxf6 10. Qd3 d6 11. g3 O-O 12. Bg2',
      note: 'White keeps e5 protected with Qd5, so Black doubles the c-pawns and opens the f-file with ...f6. Material is level again and Black has the healthier pawns.',
    },
    {
      name: '4.Nf3 Bc5 5.e3 Nc6',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Nf3 Bc5 5. e3 Nc6 6. Be2 O-O 7. O-O Re8 8. Nc3 Ngxe5 9. Nxe5 Nxe5 10. b3 a5 11. Bb2 Ra6',
      note: 'The rook lift in action: ...a5 and ...Ra6 bring the rook towards h6 or g6.',
    },
    {
      name: 'Alekhine Variation, 4.e4',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. e4 Nxe5 5. f4 Nec6 6. Be3 Bb4+ 7. Nc3 Qe7 8. Bd3 Bxc3+ 9. bxc3 Na6 10. Nf3 b6 11. O-O Bb7',
      note: 'White builds a huge centre. Black doubles the c-pawns, then aims at e4 with ...b6, ...Bb7 and ...Nc5.',
    },
    {
      name: 'Fajarowicz, 3...Ne4',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ne4 4. Nf3 Bb4+ 5. Nbd2 Nc6 6. a3 Nxd2 7. Bxd2 Bxd2+ 8. Qxd2 Qe7 9. Qc3 O-O 10. e3 Re8',
      note: 'A trickier cousin: the knight goes to e4 instead of g4. Black gives up the e5 pawn for longer, but gets easy piece play.',
    },
  ],
  traps: [
    {
      name: 'The Budapest mate: 8.axb4?? Nd3#',
      moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4 Nc6 5. Nf3 Bb4+ 6. Nbd2 Qe7 7. a3 Ngxe5 8. axb4 Nd3#',
      victim: 'white',
      explanation: '7.a3 attacks the bishop, and 8.axb4?? looks like it wins a piece. But the knight jumps to d3 with check. The e2 pawn cannot take it because the queen on e7 pins it along the open e-file, and the king is boxed in by its own pieces on d1, d2, f1 and f2. Mate. White should play 8.Nxe5 Nxe5 9.e3.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 e5', note: 'The Budapest: Black strikes at d4 at once. 3.dxe5 is the only real test; 3.d5 Bc5 or 3.e3 exd4 are harmless.' },
    { moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4', note: 'The knight hits e5. Main replies: 4.Bf4 (defending), 4.Nf3 (defending) and 4.e4 (Alekhine, giving back the pawn for the centre).' },
    { moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4 Nc6 5. Nf3 Bb4+', note: 'The key check. 6.Nbd2 keeps the pawn structure, 6.Nc3 lets you double the c-pawns with ...Bxc3+.' },
    { moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4 Nc6 5. Nf3 Bb4+ 6. Nbd2 Qe7 7. a3 Ngxe5', note: 'Trap alert: 8.axb4?? Nd3# is mate. After 8.Nxe5 Nxe5 9.e3 Bxd2+ Black is fine.' },
    { moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. e4', note: 'White returns the pawn for a big centre. Play 4...Nxe5 5.f4 Nec6 (or 5...Ng6) and hit back with ...Bb4+.' },
    { moves: '1. d4 Nf6 2. c4 e5 3. dxe5 Ne4', note: 'Fajarowicz: more of a gamble. Black develops with ...Bb4+ and ...Nc6 and wins e5 back later, if at all.' },
  ],
  modelGames: [],
};

export default opening;
