<script>
  import { formatRelative } from 'date-fns'
  import { notifications } from '../notifications'
  import { sessions } from './data'
  import SessionForm from './SessionForm.svelte'
  import Modal from '../Modal.svelte'

  let errors = null
  let open = false
  let loading = false

  const reset = () => {
    errors = null
    open = false
  }

  const save = async ({ detail }) => {
    const { groupId, lessonId, startsAt, endsAt } = detail
    const startsAtUTC = new Date(startsAt).toISOString()
    const endsAtUTC = new Date(endsAt).toISOString()
    loading = true
    try {
      const newSession = await sessions.create(startsAtUTC, endsAtUTC, groupId, lessonId)
      const date = formatRelative(new Date(startsAt), new Date(), { addSuffix: true })
      notifications.add({ text: `Created new session ${date} with ${newSession.group.name} class`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could not create new session', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  .add-button {
    margin-bottom: 1rem;
  }
</style>

<button class="button add-button is-primary" on:click={() => { open = true } }><i class="fas fa-plus"></i>&nbsp;Add a
  session</button>

<Modal bind:open>
  <SessionForm {errors} on:submit={save} on:reset={reset} {loading} />
</Modal>