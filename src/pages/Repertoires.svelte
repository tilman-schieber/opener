<script lang="ts">
  import { repertoires, newRepertoire, saveRepertoire, deleteRepertoire } from '../lib/repertoire/store.svelte.ts';
  import { countLines } from '../lib/repertoire/model.ts';
  import { repertoireFromPgn, fetchLichessStudy } from '../lib/repertoire/importPgn.ts';
  import { href, go } from '../lib/router.svelte.ts';
  import { getOpening } from '../lib/library/index.ts';

  let name = $state('');
  let color = $state<'white' | 'black'>('white');
  let importMode = $state<'none' | 'pgn' | 'study'>('none');
  let pgnText = $state('');
  let studyUrl = $state('');
  let busy = $state(false);
  let error = $state('');

  async function create() {
    const rep = newRepertoire(name.trim() || (color === 'white' ? 'White repertoire' : 'Black repertoire'), color);
    await saveRepertoire(rep);
    go(`repertoire/${rep.id}`);
  }

  async function doImport() {
    error = '';
    busy = true;
    try {
      const text = importMode === 'study' ? await fetchLichessStudy(studyUrl) : pgnText;
      const parsed = repertoireFromPgn(text);
      if (!parsed.lines || !parsed.root.children.length) throw new Error('No moves found in that PGN.');
      const rep = newRepertoire(name.trim() || parsed.chapters[0] || 'Imported repertoire', color, 'import');
      rep.root = parsed.root;
      await saveRepertoire(rep);
      go(`repertoire/${rep.id}`);
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  async function onFile(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) pgnText = await f.text();
  }

  async function remove(id: string, n: string) {
    if (confirm(`Delete “${n}”? This cannot be undone.`)) await deleteRepertoire(id);
  }
</script>

<div class="page">
  <h1>Your repertoires</h1>
  <p class="muted">Build your own lines by playing moves on the board, copy a library opening, or import a PGN / Lichess study (all variations and comments are kept).</p>

  <div class="sheet panel create">
    <div class="row">
      <input type="text" placeholder="Name (e.g. “Caro-Kann for Black”)" bind:value={name} />
      <div class="seg">
        <button class:on={color === 'white'} onclick={() => (color = 'white')}>White</button>
        <button class:on={color === 'black'} onclick={() => (color = 'black')}>Black</button>
      </div>
      <button class="btn primary" onclick={create}>New empty repertoire</button>
      <button class="btn" class:primary={importMode === 'pgn'} onclick={() => (importMode = importMode === 'pgn' ? 'none' : 'pgn')}>Import PGN</button>
      <button class="btn" class:primary={importMode === 'study'} onclick={() => (importMode = importMode === 'study' ? 'none' : 'study')}>Import Lichess study</button>
    </div>
    {#if importMode === 'pgn'}
      <textarea rows="7" placeholder="Paste PGN here (variations and comments welcome)…" bind:value={pgnText}></textarea>
      <div class="row">
        <input type="file" accept=".pgn,text/plain" onchange={onFile} />
        <span class="spacer"></span>
        <button class="btn primary" onclick={doImport} disabled={busy || !pgnText.trim()}>{busy ? 'Importing…' : 'Import as ' + color}</button>
      </div>
    {:else if importMode === 'study'}
      <div class="row">
        <input type="text" class="grow" placeholder="https://lichess.org/study/abcd1234 (or a chapter URL)" bind:value={studyUrl} />
        <button class="btn primary" onclick={doImport} disabled={busy || !studyUrl.trim()}>{busy ? 'Importing…' : 'Import as ' + color}</button>
      </div>
    {/if}
    {#if error}<div class="chip bad">{error}</div>{/if}
  </div>

  {#if !repertoires.list.length}
    <p class="muted">No repertoires yet. Tip: open any opening in the <a href={href('')}>library</a> and click “Copy to my repertoires”.</p>
  {:else}
    <div class="list">
      {#each repertoires.list as r (r.id)}
        <div class="sheet rep">
          <div class="info">
            <a href={href(`repertoire/${r.id}`)}><h3>{r.name}</h3></a>
            <div class="row small muted">
              <span class="chip">{r.color === 'white' ? 'White' : 'Black'}</span>
              <span>{countLines(r.root)} lines</span>
              <span>· {r.origin === 'library' ? `from library${r.libraryId ? ': ' + (getOpening(r.libraryId)?.name ?? '') : ''}` : r.origin === 'import' ? 'imported' : 'custom'}</span>
              <span>· updated {new Date(r.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div class="row">
            <a class="btn small" href={href(`repertoire/${r.id}`)}>Edit</a>
            <a class="btn small" href={href('play', { rep: r.id })}>Play</a>
            <a class="btn small" href={href('drill', { rep: r.id })}>Drill</a>
            <button class="btn small ghost danger" onclick={() => remove(r.id, r.name)}>Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 980px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }
  .create { display: flex; flex-direction: column; gap: 10px; }
  .create input[type='text'] { min-width: 260px; }
  .grow { flex: 1; }
  .list { display: flex; flex-direction: column; gap: 10px; }
  .rep { padding: 12px 16px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .rep .info { flex: 1; min-width: 240px; }
  .rep h3 { margin: 0 0 4px; }
</style>
