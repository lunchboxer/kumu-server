<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  const dispatch = createEventDispatcher()

  export let errors
  export let loading = false
  let form
  let saveButton
  export let startsAt = ''
  export let endsAt = ''
  export let startedAt = ''
  export let endedAt = ''

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { startsAt, endsAt, startedAt, endedAt })
  }
</script>

<h2 class="title">Edit session times</h2>
<Error {errors} />
<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
  <Input label="Scheduled start" type="datetime-local" bind:value={startsAt} required />
  <Input label="Actual start" type="datetime-local" bind:value={startedAt} required />
  <Input label="Scheduled end" type="datetime-local" bind:value={endsAt} required />
  <Input label="Actual end" type="datetime-local" bind:value={endedAt} required />

  <div class="buttons">
    <button class="button is-primary" bind:this={saveButton} type="submit">Save</button>
    <input class="button" type="reset" value="Cancel" />
  </div>

</form>