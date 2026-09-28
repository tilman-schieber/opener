<script lang="ts">
  import { getOpening } from '../lib/library/index.ts';
  import { openingContext, trapContext } from '../lib/library/context.ts';
  import { href, go } from '../lib/router.svelte.ts';
  import { playLine, tokenizeMoves } from '../lib/chess/moves.ts';
  import MiniBoard from '../components/MiniBoard.svelte';
  import { buildOpeningTree, pathTo, segmentLabel, type TreeNode } from '../lib/library/tree.ts';
  import { OPENINGS } from '../lib/library/index.ts';
  import { showPreview, hidePreview } from '../lib/preview.svelte.ts';
  import MoveSeq from '../components/MoveSeq.svelte';
  import Rich from '../components/Rich.svelte';
  import { newRepertoire, saveRepertoire, repertoires } from '../lib/repertoire/store.svelte.ts';
  import { addLine } from '../lib/repertoire/model.ts';

  let { id }: { id: string } = $props();
  const o = $derived(getOpening(id));
  let selected = $state(0);
  let previewAt = $state<number | null>(null);

  const baseLen = $derived(o ? playLine(o.base).length : 0);
  const linePlies = $derived(o ? playLine(o.lines[selected].moves) : []);
  const shown = $derived(linePlies[(previewAt ?? linePlies.length) - 1]);
  const existing = $derived(repertoires.list.find((r) => r.libraryId === id));
  const mine = $derived(o ? openingContext(o) : undefined);
  const theirs = $derived(o ? openingContext(o, { side: o.side === 'white' ? 'black' : 'white' }) : undefined);
  const LEVEL = ['', 'Beginner-friendly', 'Club level', 'Theory-heavy'];

  // Place in the move tree: the branch leading here, the parent opening, and what branches off
  const tree = buildOpeningTree(OPENINGS);
  const crumbs = $derived(pathTo(tree, id));
  const parent = $derived.by(() => {
    for (let i = crumbs.length - 2; i >= 0; i--) {
      const it = crumbs[i].items.find((x) => x.id !== id);
      if (it) return it;
    }
    return undefined;
  });
  const branches = $derived.by(() => {
    const here = crumbs[crumbs.length - 1];
    const out: { o: NonNullable<typeof parent>; n: TreeNode }[] = [];
    const walk = (n: TreeNode) => n.children.forEach((c) => (c.items.forEach((x) => out.push({ o: x, n: c })), walk(c)));
    if (here) walk(here);
    return out;
  });

  function exploreHref(moves: string, at?: number) {
    return href('explore', { moves: playLine(moves).map((p) => p.uci).join(','), opening: id, at: at?.toString() });
  }

  async function adopt() {
    if (!o) return;
    const rep = newRepertoire(o.name, o.side, 'library', o.id);
    for (const l of o.lines) addLine(rep.root, tokenizeMoves(l.moves), l.name);
    await saveRepertoire(rep);
    go(`repertoire/${rep.id}`);
  }
</script>

{#if !o || !mine || !theirs}
  <p>Unknown opening. <a href={href('')}>Back to the library</a></p>
{:else}
  <div class="detail">
    <nav class="crumbs small" aria-label="Place in the move tree">
      <a class="back" href={href('')}>Library</a>
      {#each crumbs as c}
        <span class="sep">›</span>
        <span
          class="crumb mono"
          role="button"
          tabindex="0"
          onmouseenter={(e) => showPreview(e.currentTarget, { fen: c.fen, orientation: o?.side ?? 'white', arrows: [[c.path[c.path.length - 1].uci.slice(0, 2), c.path[c.path.length - 1].uci.slice(2, 4)]] })}
          onmouseleave={hidePreview}>{segmentLabel(c)}</span
        >
      {/each}
      {#if parent}<span class="faint">· part of the <a href={href(`opening/${parent.id}`)}>{parent.name}</a></span>{/if}
    </nav>
    <header>
      <div class="title">
        <p class="meta"><span class="chip eco">{o.eco}</span><span>You play {o.side === 'white' ? 'White' : 'Black'}</span><span>{LEVEL[o.difficulty]}</span></p>
        <h1>{o.name}</h1>
        <MoveSeq moves={o.base} orientation={o.side} />
      </div>
      <div class="row actions">
        <a class="btn primary lg" href={href(`learn/${o.id}`, { line: String(selected) })}>Learn this line</a>
        <a class="btn lg" href={href('play', { rep: `lib:${o.id}`, line: String(selected) })}>Play</a>
        <a class="btn lg" href={href('drill', { rep: `lib:${o.id}` })}>Drill</a>
        <a class="btn lg" href={exploreHref(o.lines[selected].moves)}>Explore</a>
        {#if existing}
          <a class="btn lg ghost" href={href(`repertoire/${existing.id}`)}>Open your copy</a>
        {:else}
          <button class="btn lg ghost" onclick={adopt}>Copy to my repertoires</button>
        {/if}
      </div>
    </header>

    <div class="cols">
      <article class="prose">
        <p class="summary"><Rich text={o.summary} ctx={mine} /></p>

        <section>
          <h2>Plans for {o.side === 'white' ? 'White' : 'Black'}</h2>
          <ul>{#each o.ideas as i}<li><Rich text={i} ctx={mine} /></li>{/each}</ul>
        </section>

        <section>
          <h2>What {o.side === 'white' ? 'Black' : 'White'} wants</h2>
          <ul>{#each o.opponentIdeas as i}<li><Rich text={i} ctx={theirs} /></li>{/each}</ul>
        </section>

        <section>
          <h2>Pawn structure</h2>
          <p><Rich text={o.structure} ctx={mine} /></p>
        </section>

        {#if o.traps.length}
          <section>
            <h2>Traps</h2>
            <div class="traps">
              {#each o.traps as t}
                <div class="trap">
                  <div class="row">
                    <h3>{t.name}</h3>
                    <span class="chip {t.victim === o.side ? 'bad' : 'good'}">{t.victim === o.side ? 'Don’t fall for it' : 'Your chance'}</span>
                    <span class="spacer"></span>
                    <a class="small" href={exploreHref(t.moves)}>Open on the board</a>
                  </div>
                  <MoveSeq moves={t.moves} orientation={o.side} from={baseLen} />
                  <p><Rich text={t.explanation} ctx={trapContext(o, t.moves)} /></p>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        {#if branches.length}
          <section>
            <h2>Gambits and sidelines from here</h2>
            <ul class="branches">
              {#each branches as b}
                <li>
                  <a href={href(`opening/${b.o.id}`)}>{b.o.name}</a>
                  <span class="mono small faint">{segmentLabel(b.n)}</span>
                  <span class="small muted">you play {b.o.side}</span>
                </li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if o.modelGames.length}
          <section>
            <h2>Model games</h2>
            <ul>
              {#each o.modelGames as g}
                <li><strong>{g.white} – {g.black}</strong>, {g.event ? `${g.event}, ` : ''}{g.year}. <span class="muted"><Rich text={g.lesson} ctx={mine} /></span></li>
              {/each}
            </ul>
          </section>
        {/if}
        <p class="faint small">Moves in the text are live: hover one to see the position.</p>
      </article>

      <aside class="sheet lines">
        <div class="board"><MiniBoard fen={shown?.fen} orientation={o.side} lastMove={shown?.uci} /></div>
        <h3 class="label">Lines</h3>
        <ol>
          {#each o.lines as l, i}
            <li class:on={selected === i}>
              <button class="lname" onclick={() => { selected = i; previewAt = null; }}>
                <span>{l.name}</span>
                {#if i === 0}<span class="chip">main line</span>{/if}
              </button>
              {#if selected === i}
                {#if l.note}<p class="small muted"><Rich text={l.note} ctx={openingContext(o, { line: linePlies, current: linePlies[linePlies.length - 1]?.fen })} /></p>{/if}
                <MoveSeq plies={linePlies} orientation={o.side} from={baseLen} highlight={previewAt !== null ? previewAt - 1 : undefined} onselect={(n) => (previewAt = n)} />
                <a class="small" href={exploreHref(l.moves, previewAt ?? undefined)}>Continue in the explorer</a>
              {/if}
            </li>
          {/each}
        </ol>
      </aside>
    </div>
  </div>
{/if}

<style>
  .detail { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
  .crumbs { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px; color: var(--ink-2); }
  .back { color: var(--ink-2); }
  .sep { color: var(--ink-3); }
  .crumb { cursor: help; border-bottom: 1px dotted var(--ink-3); }
  .branches { list-style: none; padding: 0 !important; }
  .branches li { display: flex; gap: 10px; align-items: baseline; }
  .branches a { font-family: var(--font-display); font-size: 1.05rem; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; padding-bottom: 20px; border-bottom: 1px solid var(--rule); }
  .title { display: flex; flex-direction: column; gap: 6px; }
  .meta { display: flex; gap: 12px; align-items: center; font-size: 0.85rem; color: var(--ink-2); }
  h1 { font-size: clamp(2rem, 4.5vw, 2.9rem); }
  .cols { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 40px; align-items: start; }
  .prose { display: flex; flex-direction: column; gap: 28px; max-width: 68ch; }
  .prose section { display: flex; flex-direction: column; gap: 10px; }
  .prose h2 { font-size: 1.3rem; }
  .prose ul { display: flex; flex-direction: column; gap: 10px; line-height: 1.7; }
  .prose li + li { margin: 0; }
  .prose li::marker { color: var(--ink-3); }
  .prose p { line-height: 1.7; }
  .summary { font-size: 1.12rem; line-height: 1.65 !important; }
  .traps { display: flex; flex-direction: column; gap: 18px; }
  .trap { display: flex; flex-direction: column; gap: 6px; }
  .trap h3 { font-size: 1rem; }
  .lines { position: sticky; top: 76px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
  ol { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
  ol li { border-top: 1px solid var(--rule); padding: 8px 0; display: flex; flex-direction: column; gap: 6px; }
  ol li + li { margin: 0; }
  .lname { display: flex; align-items: center; gap: 8px; justify-content: space-between; font: inherit; font-weight: 500; text-align: left; background: none; border: 0; padding: 0; color: var(--ink); cursor: pointer; }
  .lname:hover span:first-child { color: var(--blue); }
  li.on .lname { color: var(--blue); }
  @media (max-width: 920px) {
    .cols { grid-template-columns: minmax(0, 1fr); }
    .lines { position: static; }
  }
</style>
