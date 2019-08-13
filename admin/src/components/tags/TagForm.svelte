<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'

  const dispatch = createEventDispatcher()

  export let name = ''
  export let id = null
  export let loading = false
  export let errors
  export let connections = null

  let form
  let saveButton

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, name })
  }
</script>

<style>
  .buttons {
    margin-top: 1rem;
  }
</style>

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>

  {#if errors}
   <Error {errors}/>
  {/if}

  <Input type="text" bind:value={name} label={id ? 'Name' : 'New tag name'} />

  <div class="buttons">
    <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save Tag</button>
    <input type="reset" class="button" value="Cancel">
   </div>

</form>