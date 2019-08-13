<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import DatePicker from '../DatePicker.svelte'
  import Error from '../Error.svelte'

  export let title = ''
  export let url = ''
  export let notes = ''
  export let type = ''
  export let id
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
    dispatch('submit', { title, url, notes, type })
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

<h1 class="title">{#if id}Edit{:else}Create{/if} material</h1>
  
    <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
      <Error {errors}/>

      <Input bind:value={title} label="Title" placeholder="e.g. 'Song: Teacher on the bookcase'" required />
      <Input bind:value={url} label="Complete URL" required />
      <Input bind:value={type} label="Filetype" placeholder="e.g. 'audio/mp3'" required />

      <textarea class="textarea" bind:value={notes}></textarea>

      <div class="buttons">
        <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save material</button>
        <input type="reset" class="button" value="Cancel">
      </div>
    </form>