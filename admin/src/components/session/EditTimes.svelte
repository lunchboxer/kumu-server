<script>
  import { format, formatRelative } from 'date-fns'
  import { notifications } from '../notifications'
  import { session } from './data'
  import { sessions } from '../sessions/data'
  import Modal from '../Modal.svelte'
  import EditTimesForm from './EditTimesForm.svelte'

  let open = false
  let errors = ''
  let loading = false

  const reset = () => {
    open = false
    errors = ''
  }

  const save = async ({ detail }) => {
    loading = true
    detail.startsAt = new Date(detail.startsAt).toISOString()
    detail.endsAt = new Date(detail.endsAt).toISOString()
    detail.startedAt = new Date(detail.startedAt).toISOString()
    detail.endedAt = new Date(detail.endedAt).toISOString()
    try {
      const updatedSession = await sessions.patch($session.id, detail)
      const date = formatRelative(new Date(detail.startsAt), new Date(), { addSuffix: true })
      notifications.add({ text: `Updated session to ${date} with ${updatedSession.group.name} class`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't save changes to session", type: 'danger' })
    } finally {
      loading = false
    }
  }

  const localTime = (time) => format(new Date(time), "yyyy-MM-dd'T'HH:mm")
</script>

<style>
  .button {
    margin: 1rem;
  }
</style>

<button class="button" on:click={() => { open = true }}>edit times</button>

<Modal bind:open>
  <EditTimesForm startsAt={localTime($session.startsAt)} endsAt={localTime($session.endsAt)}
    startedAt={localTime($session.startedAt)} endedAt={localTime($session.endedAt)} {loading} {errors} on:submit={save}
    on:reset={reset} />

</Modal>