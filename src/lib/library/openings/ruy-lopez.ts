import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'ruy-lopez',
  name: 'Ruy Lopez',
  eco: 'C60–C99',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nc6 3. Bb5',
  summary:
    'The Spanish Game: White attacks the knight that defends e5 and builds long-term pressure on Black\'s centre. The Closed main lines are rich maneuvering battles where White prepares d4 behind c3 and h3, then swings the queen\'s knight to the kingside.',
  ideas: [
    'Build the classic set-up: O-O, Re1, c3, h3 and d4. h3 stops ...Bg4 pinning the knight that supports d4.',
    'After ...b5 the bishop sits on b3 (or c2) aiming at f7 and the kingside — keep it; it is your best attacking piece.',
    'Reroute the queen\'s knight Nbd2–f1–g3 (or e3) to eye f5 and h5, the typical kingside squares in the Closed Ruy.',
    'Use a2–a4 to challenge Black\'s ...b5 pawn and open the a-file for your rook, especially when Black has castled and ...Bb7 is on the long diagonal.',
    'If Black exchanges on d4 (…exd4 cxd4), you get a classical big centre — support it with Nc3 or Nb3 and push d5 when it gains space with tempo.',
    'When the centre closes after d4–d5, attack on the kingside with Nf1–g3, Kh2, Rg1 and g4; answer Black\'s queenside play with b3/a4 control.',
    'In the Exchange Variation you gave the bishop for a better pawn structure: trade pieces, aim for an endgame and use your healthy kingside majority (e4 + f-pawn) to create a passed pawn.',
  ],
  opponentIdeas: [
    'Hold e5 firmly with ...a6, ...b5, ...d6 and ...Be7 (Closed), then gain queenside space with ...Na5 and ...c5.',
    'Play the solid Berlin (3...Nf6) to reach a queenless middlegame or endgame where White\'s extra space is hard to use.',
    'Grab the e4 pawn in the Open Ruy (5...Nxe4) and fight with active pieces against an e5 pawn.',
    'Gambit a pawn with the Marshall (8...d5) for a fierce kingside attack — which is why many players prefer 8.a4 or 8.h3.',
  ],
  structure:
    'Typically e4 vs e5 with White\'s c3/d4 against Black\'s d6 and ...b5. If White achieves d4 and keeps it, Black is squeezed; if the centre closes with d5, play shifts to the wings (White kingside, Black queenside). The Exchange Variation gives White a 4-vs-3 kingside majority against Black\'s doubled c-pawns and bishop pair.',
  lines: [
    {
      name: 'Closed, Chigorin (9...Na5)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 cxd4 13. cxd4 Nc6 14. Nb3',
      note: 'The classical main line: White builds the d4 centre, Black counterattacks it with ...Na5, ...c5 and ...Nc6.',
    },
    {
      name: 'Closed, Breyer (9...Nb8)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. Nbd2 Bb7 12. Bc2 Re8 13. Nf1 Bf8 14. Ng3 g6',
      note: 'Black reroutes the knight to d7 to support e5. White completes the Nd2–f1–g3 maneuver and keeps kingside chances.',
    },
    {
      name: 'Anti-Marshall, 8.h3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. h3 Bb7 9. d3 d6 10. a3 Na5 11. Ba2 c5 12. Nbd2 Nc6 13. c3 Qd7 14. Nf1',
      note: 'After 7...O-O White skips 8.c3 (which allows the Marshall 8...d5) and plays a slow d3 set-up instead.',
    },
    {
      name: 'Berlin, 4.d3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. c3 O-O 6. O-O d6 7. h3 a6 8. Ba4 Ba7 9. Re1 Ne7 10. Nbd2 Ng6 11. Nf1',
      note: 'The practical anti-Berlin: protect e4 with d3 and avoid the queenless Berlin endgame, keeping a slow Italian-style middlegame.',
    },
    {
      name: 'Exchange Variation',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O f6 6. d4 exd4 7. Nxd4 c5 8. Nb3 Qxd1 9. Rxd1 Bg4 10. f3 Be6 11. Nc3 Bd6 12. Be3 b6 13. a4',
      note: 'White trades the bishop to damage Black\'s pawns and heads for an endgame where the kingside majority matters.',
    },
    {
      name: 'Open Ruy (5...Nxe4)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Nbd2 Nc5 10. c3 d4 11. Bxe6 Nxe6 12. cxd4 Ncxd4 13. a4',
      note: 'White wins back the pawn on e5 and uses a4 to attack Black\'s loose queenside pawns.',
    },
  ],
  traps: [
    {
      name: 'Noah\'s Ark Trap',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. d4 b5 6. Bb3 Nxd4 7. Nxd4 exd4 8. Qxd4 c5 9. Qd5 Be6 10. Qc6+ Bd7 11. Qd5 c4',
      victim: 'white',
      explanation: 'Against an early ...d6, grabbing on d4 with the queen lets Black trap the b3 bishop with ...c5–c4. Recapture 8.c3 instead, or avoid 5.d4 in favour of 5.c3.',
    },
    {
      name: 'Tarrasch Trap (Open Ruy)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Re1 O-O 11. Nd4 Qd7 12. Nxe6 fxe6 13. Rxe4 dxe4 14. Qxd7',
      victim: 'black',
      explanation: 'The queen on d7 stands on the same file as White\'s queen. After 12.Nxe6 fxe6 13.Rxe4! recapturing with the d-pawn opens the d-file and 14.Qxd7 wins the queen.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5', note: 'The Ruy Lopez: the bishop attacks the defender of e5. There is no immediate threat (Bxc6 and Nxe5 fails to ...Qd4), but the pressure lasts the whole game.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O', note: 'Castle first — e4 is "hanging", but 5...Nxe4 6.d4 or 6.Re1 wins it back with a strong initiative (the Open Ruy).' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O', note: 'Black has castled, so 8.c3 allows the Marshall Gambit 8...d5. Club players often prefer 8.h3 or 8.a4 to avoid the heavy theory.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3', note: 'The key Closed position. h3 prevents ...Bg4 so that d4 can be played safely. Black picks a plan: ...Na5 (Chigorin), ...Nb8 (Breyer) or ...Bb7 (Zaitsev).' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6', note: 'The Berlin Defence. 4.O-O Nxe4 leads to the famous queenless Berlin endgame; 4.d3 keeps queens on and a normal middlegame.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6', note: 'Exchange Variation. Don\'t grab 5.Nxe5? Qd4! which regains the pawn. Castle first; then d4 really does threaten to win e5.' },
  ],
  modelGames: [
    { white: 'Bobby Fischer', black: 'Boris Spassky', year: 1972, event: 'World Championship, Reykjavik (game 10)', lesson: 'Closed Ruy, Breyer: White\'s patient pressure on the queenside and the long-lived Spanish bishop decide the game.' },
  ],
};

export default opening;
