<script lang="ts">
  import { ideasFor } from '../lib/library/ideas.ts';
  import { href } from '../lib/router.svelte.ts';

  interface Props {
    /** Positions after each move */
    fens: string[];
    preferred?: string;
    /** Extra per-position comment (from an imported repertoire) */
    comment?: string;
    /** User note editor */
    note?: string;
    onnote?: (text: string) => void;
    compact?: boolean;
  }

  let { fens, preferred, comment, note, onnote, compact = false }: Props = $props();

  const ctx = $derived(ideasFor(fens, preferred));
  let tab = $state<'ideas' | 'plans' | 'traps'>('ideas');
  let editing = $state(false);
  let draft = $state('');
</script>

<div class="card panel ideas">
  <div class="panel-title">
    <h3>Key ideas</h3>
    {#if ctx.opening}
      <a class="small" href={href(`opening/${ctx.opening.id}`)}>{ctx.opening.name} →</a>
    {/if}
  </div>

  {#if ctx.notes.length || comment || ctx.lineNames.length}
    <div class="here">
      {#if ctx.lineNames.length}<div class="chip accent">End of line: {ctx.lineNames.join(' / ')}</div>{/if}
      {#each ctx.notes as n}<p>💡 {n}</p>{/each}
      {#if comment}<p>📝 {comment}</p>{/if}
    </div>
  {/if}

  {#if ctx.traps.length}
    <div class="trap-alert">
      {#each ctx.traps as t}
        <p><strong>⚠ {t.name}</strong> — {t.explanation}</p>
      {/each}
    </div>
  {/if}

  {#if ctx.opening}
    {@const o = ctx.opening}
    {#if !compact}
      <div class="seg tabs">
        <button class:on={tab === 'ideas'} onclick={() => (tab = 'ideas')}>Your plans</button>
        <button class:on={tab === 'plans'} onclick={() => (tab = 'plans')}>Opponent</button>
        <button class:on={tab === 'traps'} onclick={() => (tab = 'traps')}>Structure & traps</button>
      </div>
    {/if}
    {#if tab === 'ideas' || compact}
      <p class="muted small side">Playing as {o.side === 'white' ? 'White' : 'Black'}</p>
      <ul>
        {#each o.ideas as i}<li>{i}</li>{/each}
      </ul>
    {:else if tab === 'plans'}
      <ul>
        {#each o.opponentIdeas as i}<li>{i}</li>{/each}
      </ul>
    {:else}
      <p>{o.structure}</p>
      {#each o.traps as t}
        <p class="small"><strong>{t.name}</strong> <span class="chip {t.victim === o.side ? 'bad' : 'good'}">{t.victim === o.side ? 'avoid' : 'set it'}</span><br />{t.explanation}</p>
      {/each}
    {/if}
  {:else if !ctx.notes.length && !comment}
    <p class="muted small">No curated ideas for this position. Library openings show plans, structures and traps here — also after transpositions.</p>
  {/if}

  {#if onnote}
    <div class="note">
      {#if editing}
        <textarea rows="3" bind:value={draft} placeholder="Your note for this position…"></textarea>
        <div class="row">
          <button class="btn small primary" onclick={() => { onnote(draft); editing = false; }}>Save note</button>
          <button class="btn small ghost" onclick={() => (editing = false)}>Cancel</button>
        </div>
      {:else if note}
        <p class="user-note" ondblclick={() => { draft = note ?? ''; editing = true; }}>🗒 {note}</p>
        <button class="btn small ghost" onclick={() => { draft = note ?? ''; editing = true; }}>Edit note</button>
      {:else}
        <button class="btn small ghost" onclick={() => { draft = ''; editing = true; }}>＋ Add a note to this position</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ideas ul { padding-left: 1.1em; font-size: 0.93rem; }
  .ideas p { font-size: 0.93rem; }
  .here { background: var(--accent-soft); border-radius: var(--radius-sm); padding: 8px 10px; margin-bottom: 10px; }
  .here p { margin: 4px 0; }
  .trap-alert { background: var(--warn-soft); border-radius: var(--radius-sm); padding: 8px 10px; margin-bottom: 10px; }
  .trap-alert p { margin: 2px 0; font-size: 0.88rem; }
  .tabs { margin-bottom: 8px; }
  .side { margin: 0 0 4px; }
  .note { margin-top: 10px; border-top: 1px solid var(--border); padding-top: 8px; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
  .user-note { margin: 0; }
</style>
