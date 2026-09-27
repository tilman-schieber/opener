# Opener — design briefs

Three directions for the look of Opener. All three are **implemented as live themes**. Switch them under
⚙ Settings → *Look & feel*, each in light and dark mode, and compare them on real screens. The layout is the same in
all three (board left, explorer / moves / ideas right). The themes change the character, not the information design.

The rest of the UI is built on CSS tokens in `src/app.css` (`--bg`, `--surface`, `--accent`, `--font-display`,
`--radius`, …). Picking a direction means deleting the other two blocks and polishing the chosen one. Nothing in the
components needs to change.

---

## A · Studio: "a precise instrument"

**Idea.** Opener as a focused professional tool, in the spirit of Linear, Raycast or the modern Lichess analysis board.
The board and the numbers are the content, and the chrome disappears.

**Who it serves.** Players who study seriously and want density and speed. It suits long sessions and people who
already know what they're doing.

**Feel.** Calm, neutral and exact, with a single indigo accent for "your" things: the active move, repertoire moves
and primary actions. Everything else is grey. Dark mode is first-class.

| | |
|---|---|
| Palette | Neutral grey surfaces (#f6f7f9 / #0f1115), indigo accent #4f5bd5 / #8b95ff, semantic green/red/amber only for meaning |
| Type | One sans family (Inter / system UI), tight tracking on headings, monospace for SAN and numbers |
| Shape | 10 px radius, 1 px hairline borders, soft shadows |
| Board | Green/cream (or any board theme), small radius, deep drop shadow so it floats |
| Density | High: tables, compact panels, uppercase micro-labels |
| Motion | Minimal: 120 ms fades and slides, no bounce |

**Strengths.** The most legible option for dense data like the explorer tables and eval graphs. It ages well and is the
easiest to keep consistent.
**Risks.** It can feel sterile, and "yet another dark dashboard" gives the app little personality or brand recall.

---

## B · Club: "the chess club library"

**Idea.** Warm, tactile and classic: a wood-panelled club room, printed opening books with serif headings and margin
notes. It borrows from chess literature, such as Chess Informant or a well-thumbed MCO.

**Who it serves.** Players who enjoy chess culture and want learning to feel like reading a good book. It is calm and
unhurried.

**Feel.** Paper, walnut and baize green. The top bar is dark walnut and the board sits in a framed wooden border.

| | |
|---|---|
| Palette | Paper #f3ecdf / #fbf7ef, ink #2b2118, baize green accent #2f5d46, walnut #5a3d26 for frames and nav |
| Type | Serif display face (Iowan Old Style / Palatino) for headings and opening names, humanist sans for body |
| Shape | Small radii (2–4 px), ruled lines instead of boxes, a subtle dot-grain paper texture |
| Board | Classic brown wood, framed by a thick walnut border |
| Density | Medium. Headings get room to breathe, and ideas read like book paragraphs |
| Motion | Gentle, page-like transitions |

**Strengths.** The most distinctive of the three and the one that fits the content best. The key ideas and structure
text shine in this setting, and it has strong brand character.
**Risks.** It can tip into kitsch if textures are overdone. The serif typography needs care at small sizes, and
dense tables need more restraint.

---

## C · Arcade: "training as a game"

**Idea.** Bold and playful, in the vein of Duolingo or Chess.com's lessons: chunky pressable buttons, saturated colour
and heavy rounded type. Opening practice should feel like play and reward you often.

**Who it serves.** Improvers, younger players and anyone who needs motivation, which is the Drill and Play loops.

**Feel.** Energetic. A pink/violet accent pair, raised 3D buttons with hard drop shadows, and big numbers.

| | |
|---|---|
| Palette | Cream #fff7ec or deep violet #150e26 base, hot pink accent #ff4f7b, violet board #9f7ce0, bright green/red feedback |
| Type | Rounded heavy sans (Nunito 800–900) for everything |
| Shape | 14–18 px radii, 2 px borders, solid offset shadows (0 4px 0) |
| Board | Violet/cream squares, rounded corners, hard shadow |
| Density | Low to medium. Bigger hit targets, fewer things at once |
| Motion | Bouncy micro-interactions, celebratory feedback on a perfect drill line |

**Strengths.** The most motivating option and the best on mobile. It stands out clearly from Lichess and ChessBase.
**Risks.** The explorer statistics are serious data and can feel out of place. It is the hardest to make look premium
and can alienate stronger players.

---

## Recommendation

For an openings trainer whose two unique features are the explorer and key ideas, **Club** has the strongest identity
and suits the reading-heavy parts. **Studio** is the safe, highly legible default. A good hybrid is **Studio's layout
and density with Club's typography and warmth**: serif opening names and ideas, a walnut nav and a wooden board, but
Studio's neutral tables and controls. Try all three in the app and tell me which one to develop further, or which
parts to mix.
