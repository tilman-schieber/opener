<script lang="ts">
  import { getOpening } from '../lib/library/index.ts';
  import { href, go } from '../lib/router.svelte.ts';
  import { playLine, formatLine } from '../lib/chess/moves.ts';
  import MiniBoard from '../components/MiniBoard.svelte';
  import { newRepertoire, saveRepertoire, repertoires } from '../lib/repertoire/store.svelte.ts';
  import { addLine } from '../lib/repertoire/model.ts';
  import { tokenizeMoves } from '../lib/chess/moves.ts';

  let { id }: { id: string } = $props();
  const o = $derived(getOpening(id));
  let selected = $state(0);

  const linePlies = $derived(o ? playLine(o.lines[selected].moves) : []);
  const existing = $derived(repertoires.list.find((r) => r.libraryId === id));

  function exploreHref(moves: string) {
    return href('explore', { moves: playLine(moves).map((p) => p.uci).join(','), opening: id });
  }

  async function adopt() {
    if (!o) return;
    const rep = newRepertoire(o.name, o.side, 'library', o.id);
    for (const l of o.lines) addLine(rep.root, tokenizeMoves(l.moves), l.name);
    await saveRepertoire(rep);
    go(`repertoire/${rep.id}`);
  }
</script>

{#if !o}
  <p>Unknown opening. <a href={href('')}>Back</a></p>
{:else}
  <div class="detail">
    <a class="muted small" href={href('')}>← Library</a>
    <header class="row">
      <div>
        <div class="row"><span class="chip">{o.eco}</span><span class="chip accent">{o.side === 'white' ? 'You play White' : 'You play Black'}</span></div>
        <h1>{o.name}</h1>
        <p class="mono muted">{o.base}</p>
      </div>
      <span class="spacer"></span>
      <div class="row actions">
        <a class="btn primary lg" href={href('play', { rep: `lib:${o.id}`, line: String(selected) })}>⚔️ Play this line</a>
        <a class="btn lg" href={href('drill', { rep: `lib:${o.id}` })}>🎯 Drill</a>
        <a class="btn lg" href={exploreHref(o.lines[selected].moves)}>🧭 Explore</a>
        {#if existing}
          <a class="btn lg ghost" href={href(`repertoire/${existing.id}`)}>🗂 In your repertoires</a>
        {:else}
          <button class="btn lg ghost" onclick={adopt}>＋ Copy to my repertoires</button>
        {/if}
      </div>
    </header>

    <div class="cols">
      <div class="stack">
        <p class="summary">{o.summary}</p>

        <section class="card panel">
          <h2>Key ideas for {o.side === 'white' ? 'White' : 'Black'}</h2>
          <ul>{#each o.ideas as i}<li>{i}</li>{/each}</ul>
        </section>

        <section class="card panel">
          <h2>What your opponent wants</h2>
          <ul>{#each o.opponentIdeas as i}<li>{i}</li>{/each}</ul>
        </section>

        <section class="card panel">
          <h2>Pawn structure</h2>
          <p>{o.structure}</p>
        </section>

        {#if o.traps.length}
          <section class="card panel">
            <h2>Traps</h2>
            {#each o.traps as t}
              <div class="trap">
                <div class="row">
                  <strong>{t.name}</strong>
                  <span class="chip {t.victim === o.side ? 'bad' : 'good'}">{t.victim === o.side ? 'Avoid falling for it' : 'Your opponent can fall for it'}</span>
                  <span class="spacer"></span>
                  <a class="small" href={exploreHref(t.moves)}>Show on board →</a>
                </div>
                <p class="mono small">{formatLine(playLine(t.moves).map((p) => p.san))}</p>
                <p>{t.explanation}</p>
              </div>
            {/each}
          </section>
        {/if}

        {#if o.modelGames.length}
          <section class="card panel">
            <h2>Model games</h2>
            <ul>
              {#each o.modelGames as g}
                <li><strong>{g.white} – {g.black}</strong>, {g.event ? `${g.event} ` : ''}{g.year}. <span class="muted">{g.lesson}</span></li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>

      <aside class="card panel lines">
        <h2>Lines</h2>
        <div class="preview"><MiniBoard fen={linePlies[linePlies.length - 1]?.fen} orientation={o.side} lastMove={linePlies[linePlies.length - 1]?.uci} /></div>
        {#each o.lines as l, i}
          <button class="line" class:on={selected === i} onclick={() => (selected = i)}>
            <strong>{l.name}</strong>
            {#if l.note}<span class="small muted">{l.note}</span>{/if}
            {#if selected === i}<span class="mono small moves">{formatLine(playLine(l.moves).map((p) => p.san))}</span>{/if}
          </button>
        {/each}
      </aside>
    </div>
  </div>
{/if}

<style>
  .detail { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }
  header { align-items: flex-end; gap: 16px; }
  header h1 { margin: 8px 0 2px; font-size: 2.2rem; }
  header p { margin: 0; }
  .actions { gap: 8px; }
  .summary { font-size: 1.1rem; }
  .cols { display: grid; grid-template-columns: 1fr 380px; gap: 20px; align-items: start; }
  .lines { position: sticky; top: 74px; display: flex; flex-direction: column; gap: 6px; }
  .preview { margin-bottom: 8px; }
  .line { text-align: left; font: inherit; background: none; border: 1px solid transparent; border-radius: var(--radius-sm); padding: 8px 10px; cursor: pointer; display: flex; flex-direction: column; gap: 2px; color: var(--text); }
  .line:hover { background: var(--surface-2); }
  .line.on { background: var(--accent-soft); border-color: var(--accent); }
  .moves { margin-top: 4px; line-height: 1.6; }
  .trap { border-top: 1px solid var(--border); padding-top: 10px; margin-top: 10px; }
  .trap:first-of-type { border-top: 0; margin-top: 0; padding-top: 0; }
  section h2 { font-size: 1.1rem; }
  @media (max-width: 900px) {
    .cols { grid-template-columns: 1fr; }
    .lines { position: static; }
  }
</style>
