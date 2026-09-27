<script lang="ts">
  import { repertoires, saveRepertoire, newRepertoire } from '../lib/repertoire/store.svelte.ts';
  import { addLine } from '../lib/repertoire/model.ts';

  let { sans, color }: { sans: string[]; color: 'white' | 'black' } = $props();
  let open = $state(false);
  let msg = $state('');

  async function add(id: string) {
    let rep = repertoires.list.find((r) => r.id === id);
    if (!rep) {
      const name = prompt('Name of the new repertoire', color === 'white' ? 'My White repertoire' : 'My Black repertoire');
      if (!name) return;
      rep = newRepertoire(name, color);
    }
    const copy = $state.snapshot(rep) as typeof rep;
    const added = addLine(copy.root, sans);
    await saveRepertoire(copy);
    msg = added ? `Added to “${copy.name}”` : `Already in “${copy.name}”`;
    open = false;
    setTimeout(() => (msg = ''), 2200);
  }
</script>

<div class="add">
  <button class="btn small" disabled={!sans.length} onclick={() => (open = !open)}>＋ Add line to repertoire</button>
  {#if open}
    <div class="menu card">
      {#each repertoires.list as r}
        <button onclick={() => add(r.id)}>{r.color === 'white' ? '♔' : '♚'} {r.name}</button>
      {/each}
      <button onclick={() => add('')}>＋ New repertoire…</button>
    </div>
  {/if}
  {#if msg}<span class="chip good">{msg}</span>{/if}
</div>

<style>
  .add { position: relative; display: inline-flex; gap: 8px; align-items: center; }
  .menu { position: absolute; top: 100%; left: 0; margin-top: 4px; z-index: 30; display: flex; flex-direction: column; min-width: 220px; padding: 4px; }
  .menu button { text-align: left; font: inherit; background: none; border: 0; padding: 7px 10px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text); }
  .menu button:hover { background: var(--surface-2); }
</style>
