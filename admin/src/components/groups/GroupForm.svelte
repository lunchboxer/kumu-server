<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import SemesterSelect from './SemesterSelect.svelte'
  import Error from '../Error.svelte'

  const dispatch = createEventDispatcher()

  let form
  let saveButton
  export let errors = ''
  export let loading = false
  export let name = ''
  export let semesterId = null
  export let id = null

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, name, semesterId })
  }

</script>


<style>
  .buttons {
    margin-top: 1rem;
  }
</style>

<h2 class="title">{#if id}Edit{:else}Add{/if} a group</h2>

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
    {#if errors}
    <Error {errors}/>
    {/if}

    <Input label="Name" bind:value={name} />

    <SemesterSelect bind:value={semesterId} edit={!!id} />

    <div class="buttons">
      <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save group</button>
      <input type="reset" class="button" value="Cancel">
    </div>
</form>