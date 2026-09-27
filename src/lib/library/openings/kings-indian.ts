import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'kings-indian-defense',
  name: "King's Indian Defense",
  eco: 'E60–E99',
  side: 'black',
  group: 'black-d4',
  difficulty: 3,
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7',
  summary:
    'A fighting hypermodern defense: Black lets White build a big centre, castles quickly, then strikes back with ...e5 (or ...c5). In the classical lines the centre locks and both sides race — White on the queenside, Black with a direct pawn storm against the white king.',
  ideas: [
    'Standard setup: ...Nf6, ...g6, ...Bg7, ...O-O, ...d6, then challenge the centre with ...e5. The g7-bishop is your best piece — keep it.',
    'When White closes the centre with d5, play on the side where your pawns point: ...Ne8 or ...Nd7, then ...f5, ...f4, ...g5–g4 for a kingside attack.',
    'In the Mar del Plata, reroute the knight ...Ne7–g6 and bring the f-pawn to f4; the light-squared bishop often lands on h3 or is traded with ...g4–g3 ideas.',
    'If the centre stays tense, ...exd4 followed by ...Re8 and ...Nc6/...Nbd7 puts pressure on e4 — a key resource against slower setups.',
    'Against the Sämisch (f3) or Four Pawns (f4), hit back at d4 with ...c5 or ...Nc6 + ...e5 before White\'s space becomes suffocating.',
    'Against the Fianchetto, ...Nc6 + ...a6 + ...Rb8 and ...b5 (Panno plan) gives queenside counterplay since a kingside attack is unrealistic.',
    'In Benoni-type positions after ...c5 d5 e6 dxe5, use the queenside majority and the long diagonal: ...a6, ...b5, ...Re8.',
  ],
  opponentIdeas: [
    'Gain maximum space with e4 and often f3/f4, then close the centre with d5 at the right moment.',
    'Attack on the queenside with c5, b4–b5 and Nd3, aiming at c7 and breaking through before Black\'s kingside storm lands.',
    'In the Sämisch: Be3, Qd2, O-O-O and h4–h5 for a direct attack on the black king.',
    'Trade the g7-bishop (Be3–h6 in the Sämisch) to weaken Black\'s dark squares.',
  ],
  structure:
    'Typically White has pawns on c4/d4/e4 against Black\'s d6/g6. After ...e5 and d5 the centre locks: White\'s pawns point to the queenside, Black\'s (e5, then f5) point to the kingside, so each side attacks where their pawn chain points. If Black trades with ...exd4, the e4 pawn becomes the target on the half-open e-file.',
  lines: [
    {
      name: 'Classical, Mar del Plata (9.Ne1)',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 Nf6 12. f3 f4 13. c5 g5 14. Rc1 Ng6',
      note: 'The famous race: White breaks with c5 on the queenside, Black storms with ...g5–g4 on the kingside.',
    },
    {
      name: 'Classical, Bayonet Attack (9.b4)',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4 Nh5 10. Re1 f5 11. Ng5 Nf6 12. f3 Kh8',
      note: 'White gains queenside space fast; Black still aims for ...f5 while ...Nh5 prevents Ne1 ideas.',
    },
    {
      name: 'Sämisch Variation (5.f3), Panno plan',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 Nc6 7. Nge2 a6 8. Qd2 Rb8 9. h4 h5 10. O-O-O b5 11. Nd5 bxc4 12. Nxf6+ Bxf6 13. Nc3',
      note: 'With kings on opposite wings, Black\'s ...b5 counterattack must be faster than White\'s h-file attack.',
    },
    {
      name: 'Four Pawns Attack (5.f4)',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Nf3 c5 7. d5 e6 8. Be2 exd5 9. cxd5 Bg4 10. O-O Nbd7 11. h3 Bxf3 12. Bxf3 a6 13. a4 Re8',
      note: 'Hit the over-extended centre with ...c5 and ...e6; Black eyes the e5 square and the e4 pawn.',
    },
    {
      name: 'Fianchetto Variation, Panno (6...Nc6)',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O a6 8. d5 Na5 9. Nd2 c5 10. Qc2 Rb8 11. b3 b5 12. Bb2 bxc4 13. bxc4 Bh6',
      note: 'Against the solid fianchetto, Black plays on the queenside: ...Rb8, ...b5 and pressure on the b-file.',
    },
    {
      name: 'Averbakh Variation (5.Be2 + 6.Bg5)',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5 c5 7. d5 e6 8. Qd2 exd5 9. exd5 Re8 10. Nf3 Bg4 11. O-O Nbd7 12. h3 Bxf3 13. Bxf3 a6 14. a4 Qc7',
      note: 'The Bg5 pin stops ...e5 for now, so Black switches to ...c5 and Benoni-style play on the e-file.',
    },
  ],
  traps: [
    {
      name: 'Exchange Variation: grabbing e5',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. dxe5 dxe5 8. Qxd8 Rxd8 9. Nxe5 Nxe4 10. Nxf7 Bxc3+ 11. bxc3 Kxf7',
      victim: 'white',
      explanation:
        'After the queen trade, 9.Nxe5? runs into 9...Nxe4!, using the pin on the long diagonal. 10.Nxe4 Bxe5 just regains the pawn, and the greedy 10.Nxf7 Bxc3+ 11.bxc3 Kxf7 leaves Black a piece for a pawn up.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7', note: 'The KID setup: finish with ...d6 and ...O-O, then choose your central strike (...e5 is the main one).' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O', note: 'The Classical main position. 7...Nc6 invites 8.d5 and the kingside race; 7...Na6 and 7...exd4 are calmer alternatives.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7', note: 'Centre closed: prepare ...f5 with ...Nd7 or ...Ne8 (or ...Nh5). The knight on e7 will go to g6 to support ...f4 and ...g5.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 Nf6 12. f3 f4', note: 'Classic pawn chain: ...g5–g4 is the plan. Every tempo counts — do not defend passively on the queenside.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3', note: 'Sämisch: f3 guards e4 and prepares Be3/Qd2/O-O-O. Counter in the centre with ...c5 or ...Nc6 + ...a6 + ...Rb8.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4', note: 'Four Pawns: impressive but loose. Strike immediately with ...O-O and ...c5 before White consolidates.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3', note: 'Fianchetto: the king is safe, so aim for queenside play (...Nc6, ...a6, ...Rb8, ...b5) or ...Nbd7 + ...e5 + ...c6.' },
  ],
  modelGames: [
    {
      white: 'Jeroen Piket',
      black: 'Garry Kasparov',
      year: 1989,
      event: 'Tilburg',
      lesson: 'Mar del Plata at its best: Kasparov ignores the queenside and wins with a direct kingside pawn storm.',
    },
  ],
};

export default opening;
