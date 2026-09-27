<script lang="ts">
  import { repertoires, libraryReps } from '../lib/repertoire/store.svelte.ts';

  let { value = $bindable(''), allowCustom = false }: { value?: string; allowCustom?: boolean } = $props();
  const lib = libraryReps();
</script>

<select bind:value>
  {#if allowCustom}<option value="">— Custom line from the explorer —</option>{/if}
  {#if repertoires.list.length}
    <optgroup label="My repertoires">
      {#each repertoires.list as r}<option value={r.id}>{r.color === 'white' ? '♔' : '♚'} {r.name}</option>{/each}
    </optgroup>
  {/if}
  <optgroup label="Library — as White">
    {#each lib.filter((r) => r.color === 'white') as r}<option value={r.id}>♔ {r.name}</option>{/each}
  </optgroup>
  <optgroup label="Library — as Black">
    {#each lib.filter((r) => r.color === 'black') as r}<option value={r.id}>♚ {r.name}</option>{/each}
  </optgroup>
</select>
