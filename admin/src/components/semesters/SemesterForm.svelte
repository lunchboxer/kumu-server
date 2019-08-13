<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import DatePicker from '../DatePicker.svelte'
  import Error from '../Error.svelte'

  let saveButton
  let form
  let startDate
  let endDate
  export let errors
  export let loading
  export let name = ''
  export let defaultDate = null
  const options = {
    inline: true,
    mode: 'range',
    enableTime: false,
    altInput: true,
    altFormat: 'M j, Y',
    dateFormat: 'Y-m-d'
  }

  const dispatch = createEventDispatcher()

  $: if (saveButton) { saveButton.disabled = loading }

  const handleChange = (selectedDates) => {
    if (selectedDates.length === 2) {
      startDate = selectedDates[0].toISOString()
      endDate = new Date(selectedDates[1].setHours(23, 59, 59, 999)).toISOString()
    }
  }
  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { name, startDate, endDate })
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

<h1 class="title">{#if defaultDate}Edit{:else}Create{/if} semester</h1>

  <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
    <Error {errors}/>
    <Input bind:value={name} label="Name" placeholder="i.e. 'Autumn 1978'" required />
    <label class="label" >
      Start and end dates
    </label>
    <DatePicker bind:value={defaultDate} placeholder="Pick two dates below" className="input" {options} 
      on:change={(event) => handleChange(...event.detail)} />
    <div class="buttons">
      <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save semester</button>
      <input type="reset" class="button" value="Cancel">
    </div>
  </form>