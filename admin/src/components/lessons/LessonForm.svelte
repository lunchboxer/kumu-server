<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  let saveButton
  let form

  export let errors
  export let loading
  export let name = ''
  export let summaryEN = ''
  export let homeworkEN = ''
  export let homeworkZH = ''
  export let summaryZH = ''
  export let id = ''
  export let tags = []

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
    dispatch('submit', { name, summaryEN, summaryZH, homeworkEN, homeworkZH })
  }
</script>

<style>
  .buttons {
    padding: 1rem;
  }

  .field {
    margin: 1rem;
    max-width: 700px;
  }
</style>

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
  <Error {errors} />
  <div class="field">
    <Input bind:value={name} label="Name" placeholder="i.e. 'My Body part 3'" required />
  </div>

  <div class="field">
    <label class="label">Summary in English</label>
    <textarea class="textarea is-primary" bind:value={summaryEN}></textarea>
  </div>

  <div class="field">
    <label class="label">Homework in English</label>
    <textarea class="textarea is-primary" bind:value={homeworkEN}></textarea>
  </div>

  <div class="field">
    <label class="label">Summary in Chinese</label>
    <textarea class="textarea is-info" bind:value={summaryZH}></textarea>
  </div>

  <div class="field">
    <label class="label">Homework in Chinese</label>
    <textarea class="textarea is-info" bind:value={homeworkZH}></textarea>
  </div>


  <div class="buttons">
    <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save
      lesson</button>
    <input type="reset" class="button" value="Cancel">
  </div>
</form>