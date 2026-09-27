<script lang="ts">
  import { ideasFor } from '../lib/library/ideas.ts';
  import { openingContext, trapContext } from '../lib/library/context.ts';
  import { href } from '../lib/router.svelte.ts';
  import { INITIAL_FEN } from '../lib/chess/moves.ts';
  import Rich from './Rich.svelte';
  import MoveSeq from './MoveSeq.svelte';

  interface Props {
    /** Positions after each move */
    fens: string[];
    preferred?: string;
    /** Extra per-position comment (from an imported repertoire) */
    comment?: string;
    /** User note editor */
    note?: string;
    onnote?: (text: string) => void;
    /** Board orientation for previews */
    orientation?: 'white' | 'black';
  }

  let { fens, preferred, comment, note, onnote, orientation }: Props = $props();

  const ctx = $derived(ideasFor(fens, preferred));
  const current = $derived(fens[fens.length - 1] ?? INITIAL_FEN);
  const o = $derived(ctx.opening);
  const mine = $derived(o ? openingContext(o, { current }) : { side: orientation ?? 'white', starts: [current] });
  const theirs = $derived(o ? openingContext(o, { current, side: o.side === 'white' ? 'black' : 'white' }) : mine);
  const view = $derived(orientation ?? o?.side ?? 'white');

  let tab = $state<'plans' | 'opponent' | 'structure'>('plans');
  let editing = $state(false);
  let draft = $state('');
</script>

<section class="sheet panel ideas">
  <div class="panel-head">
    <h3>Key ideas</h3>
    {#if o}<a class="oname" href={href(`opening/${o.id}`)}>{o.name}</a>{/if}
  </div>

  {#if ctx.lineNames.length || ctx.notes.length || comment}
    <div class="note blue here">
      <div class="label">This position</div>
      {#if ctx.lineNames.length}<p>End of the prepared line <span class="name">{ctx.lineNames.join(' / ')}</span>.</p>{/if}
      {#each ctx.notes as n}<p><Rich text={n} ctx={mine} orientation={view} /></p>{/each}
      {#if comment}<p><Rich text={comment} ctx={mine} orientation={view} /></p>{/if}
    </div>
  {/if}

  {#each ctx.traps as t}
    <div class="note amber trap">
      <div class="label">Trap ahead: {t.name}</div>
      <MoveSeq moves={t.moves} orientation={view} from={Math.max(0, fens.length)} />
      <p>{#if o}<Rich text={t.explanation} ctx={trapContext(o, t.moves)} orientation={view} />{:else}{t.explanation}{/if}</p>
    </div>
  {/each}

  {#if o}
    <div class="seg tabs" role="tablist">
      <button role="tab" aria-selected={tab === 'plans'} class:on={tab === 'plans'} onclick={() => (tab = 'plans')}>{o.side === 'white' ? 'White' : 'Black'} plans</button>
      <button role="tab" aria-selected={tab === 'opponent'} class:on={tab === 'opponent'} onclick={() => (tab = 'opponent')}>{o.side === 'white' ? 'Black' : 'White'} plans</button>
      <button role="tab" aria-selected={tab === 'structure'} class:on={tab === 'structure'} onclick={() => (tab = 'structure')}>Structure</button>
    </div>
    {#if tab === 'plans'}
      <ul>{#each o.ideas as i}<li><Rich text={i} ctx={mine} orientation={view} /></li>{/each}</ul>
    {:else if tab === 'opponent'}
      <ul>{#each o.opponentIdeas as i}<li><Rich text={i} ctx={theirs} orientation={view} /></li>{/each}</ul>
    {:else}
      <p><Rich text={o.structure} ctx={mine} orientation={view} /></p>
    {/if}
    <p class="faint small hint">Hover a move to see it on a board.</p>
  {:else if !ctx.notes.length && !comment}
    <p class="muted small">No curated ideas for this position yet. Plans, structures and traps from the library appear here, also after transpositions.</p>
  {/if}

  {#if onnote}
    <div class="user">
      {#if editing}
        <label for="pos-note" class="label">Your note for this position</label>
        <textarea id="pos-note" rows="3" bind:value={draft}></textarea>
        <div class="row">
          <button class="btn small primary" onclick={() => { onnote(draft); editing = false; }}>Save note</button>
          <button class="btn small ghost" onclick={() => (editing = false)}>Cancel</button>
        </div>
      {:else if note}
        <div class="label">Your note</div>
        <p><Rich text={note} ctx={mine} orientation={view} /></p>
        <button class="btn small ghost" onclick={() => { draft = note ?? ''; editing = true; }}>Edit note</button>
      {:else}
        <button class="btn small ghost" onclick={() => { draft = ''; editing = true; }}>Add a note to this position</button>
      {/if}
    </div>
  {/if}
</section>

<style>
  .ideas { display: flex; flex-direction: column; gap: 12px; }
  .ideas .panel-head { margin-bottom: 0; }
  .oname { font-family: var(--font-display); font-style: italic; font-size: 1.05rem; color: var(--ink); }
  .oname:hover { color: var(--blue); }
  ul { display: flex; flex-direction: column; gap: 8px; padding-left: 1.1em; font-size: 0.93rem; line-height: 1.65; }
  li + li { margin: 0; }
  li::marker { color: var(--ink-3); }
  p { font-size: 0.93rem; line-height: 1.65; }
  .here, .trap { display: flex; flex-direction: column; gap: 6px; }
  .tabs { align-self: flex-start; }
  .hint { margin-top: -4px; }
  .user { border-top: 1px solid var(--rule); padding-top: 10px; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
</style>
