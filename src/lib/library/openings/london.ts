import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'london-system',
  name: 'London System',
  eco: 'D02, A46–A48',
  side: 'white',
  group: 'white-d4',
  difficulty: 1,
  base: '1. d4',
  summary:
    'A system rather than a sharp opening: White plays d4, Bf4, e3, Nf3, c3, Nbd2 and Bd3 against almost anything. The set-up is solid, easy to learn and aims for a kingside attack with Ne5, f4 and Qf3, or a slow squeeze if Black is passive.',
  ideas: [
    'Play 2.Bf4 early (before e3) so the dark-squared bishop gets outside the pawn chain; then e3, Nf3, c3, Nbd2, Bd3 and O-O.',
    'If Black plays ...Bd6 to trade bishops, retreat Bg3: after ...Bxg3 hxg3 the half-open h-file helps your kingside attack.',
    'Classic attacking plan: Ne5, f4, Qf3 (or Rf3) and a rook lift toward h3 — very strong when Black\'s knight can be kicked from f6.',
    'Against ...c5 keep the pyramid c3–d4–e3; if Black pushes ...c4, break with b3 or e3–e4 to attack the pawn chain.',
    'Meet an early ...Qb6 with Qb3 (or Qc1) to guard b2; after a queen trade on b3, axb3 opens the a-file for your rook.',
    'Against a King\'s Indian set-up play h3 (so the bishop can drop to h2 against ...Nh5) and meet ...e5 by keeping the bishop on the h2–b8 diagonal.',
  ],
  opponentIdeas: [
    'Hit b2 and d4 quickly with ...c5, ...Nc6 and ...Qb6.',
    'Trade off the London bishop with ...Bd6 or ...Nh5.',
    'Play the ...e5 break in King\'s Indian set-ups to question the f4 bishop.',
    'Develop the light-squared bishop with ...Bf5 before ...e6, to avoid it getting locked in.',
  ],
  structure:
    'White\'s c3–d4–e3 triangle with the bishop outside it on f4 (or g3/h2). Black usually has d5/e6 with ...c5, or a King\'s Indian fianchetto. The e5 square is White\'s key outpost for the knight.',
  lines: [
    {
      name: 'Main line vs ...d5, ...e6 and ...c5',
      moves: '1. d4 d5 2. Bf4 Nf6 3. e3 e6 4. Nf3 c5 5. c3 Nc6 6. Nbd2 Bd6 7. Bg3 O-O 8. Bd3 b6 9. Ne5 Bb7 10. f4 Ne7 11. Qf3',
      note: 'The classic London attacking set-up: Ne5, f4 and Qf3 with a view to the kingside.',
    },
    {
      name: 'Early ...c5 and ...Qb6 (7.Qc1)',
      moves: '1. d4 d5 2. Bf4 c5 3. e3 Nc6 4. c3 Qb6 5. Qb3 c4 6. Qc2 Bf5 7. Qc1 e6 8. Nd2 Nf6 9. Ngf3 Be7 10. Be2 O-O 11. O-O',
      note: 'The queen guards b2 from c1. Later b3 attacks Black\'s c4 pawn chain.',
    },
    {
      name: 'Vs King\'s Indian set-up',
      moves: '1. d4 Nf6 2. Bf4 g6 3. e3 Bg7 4. Nf3 d6 5. h3 O-O 6. Be2 c5 7. c3 b6 8. O-O Bb7 9. Nbd2 Nbd7 10. a4 a6 11. Bh2',
      note: 'Keep it solid: h3 gives the bishop a retreat to h2, and a4 gains queenside space against ...b5.',
    },
    {
      name: 'Vs ...Bf5 (3.c4)',
      moves: '1. d4 d5 2. Bf4 Bf5 3. c4 e6 4. Nc3 c6 5. Qb3 Qb6 6. c5 Qxb3 7. axb3 Nd7 8. b4 Ngf6 9. e3 Be7 10. b5',
      note: 'When Black copies with ...Bf5, switch to c4 and Qb3 to hit b7; after the queen trade the a-file and a queenside pawn storm favour White.',
    },
    {
      name: 'Vs Queen\'s Indian set-up (...b6)',
      moves: '1. d4 Nf6 2. Bf4 e6 3. e3 b6 4. Nf3 Bb7 5. h3 c5 6. c3 Be7 7. Nbd2 O-O 8. Bd3 d6 9. O-O Nbd7 10. Qe2',
      note: 'Against a fianchettoed bishop, prepare e3–e4 to blunt it and gain central space.',
    },
  ],
  traps: [
    {
      name: 'The early Bd3?? and ...c4 fork',
      moves: '1. d4 d5 2. Bf4 c5 3. e3 Nc6 4. Nf3 Qb6 5. Bd3 c4 6. Be2 Qxb2 7. Nbd2 Nb4 8. O-O Nxc2',
      victim: 'white',
      explanation: 'With the queen on b6 hitting b2, 5.Bd3? allows ...c4 with tempo; Black grabs b2 and the knight joins via b4 to attack c2 and a1. Guard b2 first with Qb3/Qc1 or play c3 before Bd3.',
    },
  ],
  positions: [
    { moves: '1. d4 d5 2. Bf4', note: 'The modern London: develop the bishop before e3 so it is not shut in. Next e3, Nf3, c3, Nbd2 and Bd3.' },
    { moves: '1. d4 d5 2. Bf4 c5 3. e3 Nc6 4. c3 Qb6', note: 'b2 is attacked. 5.Qb3 is the main answer; if Black pushes ...c4, retreat to c2 and later c1.' },
    { moves: '1. d4 d5 2. Bf4 Nf6 3. e3 e6 4. Nf3 c5 5. c3 Nc6 6. Nbd2 Bd6', note: 'Black offers a bishop trade. Retreat 7.Bg3 — after ...Bxg3 hxg3 your h-file is half-open.' },
    { moves: '1. d4 Nf6 2. Bf4 g6 3. e3 Bg7 4. Nf3', note: 'Against the King\'s Indian set-up, play h3 soon so ...Nh5 can be met by Bh2, keeping your bishop.' },
    { moves: '1. d4 d5 2. Bf4 Nf6 3. e3 e6 4. Nf3 c5 5. c3 Nc6 6. Nbd2 Bd6 7. Bg3 O-O 8. Bd3 b6 9. Ne5', note: 'The knight on e5 is the heart of the attack. Support it with f4, then bring the queen to f3 and look for Qh3 or Rf3–h3.' },
  ],
  modelGames: [],
};

export default opening;
