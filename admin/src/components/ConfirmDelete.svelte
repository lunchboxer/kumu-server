<script>
  import { createEventDispatcher } from 'svelte';
  import Error from './Error.svelte'

  const dispatch = createEventDispatcher();

  export let open = false
  export let loading = false
  export let errors = ''
  export let name = "item"

  const handleDelete = async () => {
    dispatch('delete')
  }
  const close = () => { open = false }
</script>

<style>
  .buttons {
    float: right;
    padding: 1rem;
  }
</style>

<h1 class="title">Delete {name}</h1>
<Error {errors} />
<p>Permanently delete <slot>
    <span class="placeholder">item</span>
  </slot>
  ?</p>
<div class="buttons">
  <button class="button is-primary" disabled={loading} class:is-loading={loading}
    on:click={handleDelete}>Delete</button>
  <button class="button" on:click={close}>Keep it</button>
</div>