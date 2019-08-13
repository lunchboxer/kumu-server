<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  export let english = ''
  export let chinese = ''
  export let audio = ''
  export let id = null
  export let errors
  export let loading
  let saveButton
  let form

  const dispatch = createEventDispatcher()

  $: if (saveButton) { saveButton.disabled = loading }

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { english, chinese, audio })
  }
</script>

<style>
  .buttons {
    padding-top: 1rem;
  }

  form {
    max-width: 308px;
  }
</style>

<h1 class="title">{#if id}Edit{:else}Create{/if} word</h1>
    
      <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
        <Error {errors}/>
  
        <Input bind:value={english} label="English" placeholder="e.g. 'bookcase'" required />
        <Input bind:value={chinese} label="Chinese" placeholder="e.g. '书柜'" />
        <Input bind:value={audio} label="URL of audio" />
  
        <div class="buttons">
          <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save word</button>
          <input type="reset" class="button" value="Cancel">
        </div>
      </form>