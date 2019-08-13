<script>
  import { format } from 'date-fns'
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import { semester } from './data'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'
  import SemesterSelect from './SemesterSelect.svelte'
  import GroupSelect from '../GroupSelect.svelte'
  import LessonSelect from './LessonSelect.svelte'

  const dispatch = createEventDispatcher()
  const defaultStart = new Date()
  defaultStart.setHours(19)
  defaultStart.setMinutes(0)
  const defaultEnd = new Date()
  defaultEnd.setHours(20)
  defaultEnd.setMinutes(30)

  export let errors
  export let loading = false
  let form
  let saveButton
  export let id = ''
  export let groupId = ''
  export let startsAt = format(defaultStart, "yyyy-MM-dd'T'HH:mm")
  export let endsAt = format(defaultEnd, "yyyy-MM-dd'T'HH:mm")
  export let lessonId = ''

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, groupId, startsAt, endsAt, lessonId })
  }
</script>

<style>
  .buttons {
    padding: 1rem 0;
  }
</style>

<h2 class="title">{#if id}Edit{:else}Add{/if} a class session</h2>
<Error {errors} />
<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
  <Input label="Start time" type="datetime-local" bind:value={startsAt} required />
  <Input label="End time" type="datetime-local" bind:value={endsAt} required />
 <label class="label">
   Semester & Group
 </label>
  <SemesterSelect />
  {#if $semester}
    <GroupSelect bind:groupId groups={$semester.groups} required />
  {/if}

  <label class="label">Add lesson</label>

  <LessonSelect bind:lessonId />

  <div class="buttons">
      <button class="button is-primary" bind:this={saveButton} type="submit">Save</button>
      <input class="button" type="reset" value="Cancel" />
  </div>
 
</form>