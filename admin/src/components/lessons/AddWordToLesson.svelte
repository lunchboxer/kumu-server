<script>
  import { onMount } from 'svelte'
  import { words } from '../words/data'
  import Modal from '../Modal.svelte'
  import Error from '../Error.svelte'
  import AddWordRow from './AddWordRow.svelte'
  import FilterItems from '../FilterItems.svelte'

  let open = false
  let errors = ''

  onMount(async () => {
    try {
      await words.get()
    } catch (error) {
      errors = error
    }
  })
</script>

<style>
  .buttons {
    padding: 1rem 0;
  }

  .add {
    margin-top: 1rem;
  }
</style>

<button class="button add" on:click={() => { open = true }}>add words</button>

<Modal bind:open>

  <h2 class="title is-4">Add word to lesson</h2>

  <FilterItems store={words} searchParams={['english', 'chinese']} />

  <Error {errors} />

  <div class="results">
    {#if $words }
      <p>{$words.length} matches:</p>
      {#each $words as word (word.id)}
        <AddWordRow {word} />
      {/each}
      {/if}
    </div>
  
    <div class="buttons">
      <button class="button" on:click={() => { open = false }}>Exit</button>
    </div>
  
  
  </Modal>