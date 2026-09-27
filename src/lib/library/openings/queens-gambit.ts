import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'queens-gambit',
  name: 'Queen\'s Gambit',
  eco: 'D06–D69',
  side: 'white',
  group: 'white-d4',
  difficulty: 2,
  base: '1. d4 d5 2. c4',
  summary:
    'White offers the c-pawn to deflect Black\'s d5 pawn and gain the centre. It is not a real gambit — the pawn can almost always be regained — and it leads to solid positions where White enjoys more space and clear plans such as the minority attack.',
  ideas: [
    'In the QGD Exchange (cxd5 exd5) you get the Carlsbad structure: play Bd3, Qc2, Bg5 and then choose a plan.',
    'Minority attack: with Nf3, O-O and Rb1, push b2–b4–b5 to create a weak c-pawn in Black\'s queenside.',
    'Central plan: with Nge2, f3 and Rae1/Rad1, prepare e3–e4 to build a big centre and attack on the kingside.',
    'Against the QGA (…dxc4), take the centre with e4 or play Nf3/e3 and win back c4 with Bxc4 — don\'t cling to material, develop.',
    'In the Slav with 4...dxc4, play 5.a4 to stop ...b5, then e3/Bxc4 or e4 and O-O; the e4–e5 push gains space later.',
    'Use the pin Bg5 against the f6 knight to increase pressure on d5, especially after cxd5 exd5.',
    'Don\'t grab d5 just because the f6 knight looks pinned: with a knight on d7, Nxd5?? runs into the Elephant Trap. Count what the pin really holds first.',
  ],
  opponentIdeas: [
    'Hold the d5 point with ...e6 (QGD) or ...c6 (Slav) and free the position later with ...c5 or ...e5.',
    'Take on c4 and try to keep the pawn with ...b5 (usually a mistake) or use the time for ...c5.',
    'In the Exchange Variation, play ...Ne4 or ...Nh5 to trade pieces and counterattack with ...f5 or on the kingside.',
    'Counter-gambit with the Albin (2...e5), aiming for a cramping d4 pawn and queenside castling.',
  ],
  structure:
    'The Carlsbad structure (White d4/e3 vs Black d5/c6, half-open c- and e-files) is the most typical: White has a queenside minority attack and a central e4 break. In the QGA and Slav with ...dxc4, White usually gets an e4/d4 centre or an isolated d-pawn with active pieces.',
  lines: [
    {
      name: 'QGD Exchange, Nge2 and f3',
      moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6 6. Qc2 Be7 7. e3 Nbd7 8. Bd3 O-O 9. Nge2 Re8 10. O-O Nf8 11. f3 Be6 12. Rad1',
      note: 'The ambitious central plan: f3 and e4 build a big centre and prepare a kingside attack.',
    },
    {
      name: 'QGD Exchange, minority attack',
      moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6 6. Qc2 Be7 7. e3 Nbd7 8. Bd3 O-O 9. Nf3 Re8 10. O-O Nf8 11. Rab1 Ne4 12. Bxe7 Qxe7 13. b4',
      note: 'White pushes b4–b5 to leave Black with a weak c-pawn or a backward d5.',
    },
    {
      name: 'QGA, 3.e4',
      moves: '1. d4 d5 2. c4 dxc4 3. e4 e5 4. Nf3 exd4 5. Bxc4 Nc6 6. O-O Be6 7. Bxe6 fxe6 8. Qb3 Qd7 9. Qxb7 Rb8 10. Qa6 Nf6 11. Nbd2',
      note: 'The most direct approach: grab the centre and attack Black\'s weakened e6 and b7.',
    },
    {
      name: 'QGA, Classical 3.Nf3',
      moves: '1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. a4 Nc6 8. Qe2 cxd4 9. Rd1 Be7 10. exd4 O-O 11. Nc3',
      note: 'White gets an isolated d-pawn with lots of activity; the d4–d5 break is the key idea.',
    },
    {
      name: 'Slav, 5.a4',
      moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O O-O 9. Qe2 Nbd7 10. e4 Bg6 11. Bd3 Bh5 12. e5 Nd5 13. Nxd5 cxd5 14. Qe3',
      note: 'The main line: a4 stops ...b5, White regains c4 and uses e4–e5 for a space advantage on the kingside.',
    },
    {
      name: 'Albin Counter-Gambit',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3 Be6 6. Nbd2 Qd7 7. Bg2 O-O-O 8. O-O Bh3 9. Bxh3 Qxh3 10. a3',
      note: 'Keep the extra pawn, fianchetto and castle; then attack on the queenside with a3 and b4 where Black\'s king lives.',
    },
  ],
  traps: [
    {
      name: 'Elephant Trap',
      moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. cxd5 exd5 6. Nxd5 Nxd5 7. Bxd8 Bb4+ 8. Qd2 Bxd2+ 9. Kxd2 Kxd8',
      victim: 'white',
      explanation: 'The f6 knight looks pinned, but after 6.Nxd5? Nxd5! 7.Bxd8 Bb4+ Black wins back the queen and ends up a piece ahead. Don\'t take on d5 here.',
    },
    {
      name: 'Lasker Trap (Albin)',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3 6. Bxb4 exf2+ 7. Ke2 fxg1=N+ 8. Ke1 Qh4+',
      victim: 'white',
      explanation: 'Against the Albin, 4.e3? is a mistake. After 6.Bxb4? exf2+ Black underpromotes to a knight with check and wins. Play 4.Nf3 instead.',
    },
    {
      name: 'QGA: holding the pawn with ...b5',
      moves: '1. d4 d5 2. c4 dxc4 3. e3 b5 4. a4 c6 5. axb5 cxb5 6. Qf3',
      victim: 'black',
      explanation: 'Trying to keep c4 with ...b5 fails: after a4 and axb5 the long diagonal opens and Qf3 hits the a8 rook. Blocking with ...Nc6 loses the knight to Qxc6+.',
    },
  ],
  positions: [
    { moves: '1. d4 d5 2. c4', note: 'The Queen\'s Gambit. Main replies: 2...e6 (QGD), 2...c6 (Slav), 2...dxc4 (QGA). If Black takes, don\'t rush to recover the pawn — develop and it comes back.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5', note: 'The Carlsbad structure. Develop with Bg5, e3, Bd3 and Qc2, then choose: Nf3 + minority attack (b4–b5), or Nge2 + f3 and e4.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7', note: 'Beware the Elephant Trap: 5.cxd5 exd5 6.Nxd5?? loses a piece. Continue with 5.e3 or 5.cxd5 exd5 6.e3.' },
    { moves: '1. d4 d5 2. c4 dxc4', note: 'The QGA. Choose 3.e4 (grab the centre) or 3.Nf3 with e3 and Bxc4. 3.e3 is also fine; Black cannot hold the pawn.' },
    { moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4', note: 'Slav: play 5.a4 so ...b5 is impossible, then e3 and Bxc4 (or Ne5/e4 ideas).' },
    { moves: '1. d4 d5 2. c4 e5 3. dxe5 d4', note: 'Albin Counter-Gambit. 4.Nf3! — not 4.e3?, which falls into the Lasker Trap. Then g3, Bg2, Nbd2 and O-O.' },
  ],
  modelGames: [],
};

export default opening;
