<script>
  import { onMount } from 'svelte'
  import { materials } from '../materials/data'
  import Modal from '../Modal.svelte'
  import Error from '../Error.svelte'
  import AddMaterialRow from './AddMaterialRow.svelte'
  import FilterItems from '../FilterItems.svelte'

  export let lesson
  let open = false
  let errors = ''

  onMount(async () => {
    try {
      await materials.get()
    } catch (error) {
      errors = error
    }
  })
</script>

<style>
  .buttons {
    padding: 1rem 0;
  }
</style>

<button class="button" on:click={() => { open = true }}>add material</button>

<Modal bind:open>

  <h2 class="title is-4">Add material to lesson</h2>

  <FilterItems store={materials} searchParams='title' />

  <Error {errors} />
  <div class="results">
    {#if $materials }
    <p>{$materials.length} matches:</p>
    {#each $materials as material (material.id)}
      <AddMaterialRow {material} />
    {/each}
    {/if}
  </div>

  <div class="buttons">
    <button class="button" on:click={() => { open = false }}>Exit</button>
  </div>


</Modal>