<script>
  import { formatRelative } from 'date-fns'
  import { notifications } from '../notifications'
  import { sessions } from './data'
  import ConfirmDelete from '../ConfirmDelete.svelte'

  export let open = false
  export let session = {}
  let loading = false
  let errors = ''

  const handleDelete = async () => {
    loading = true
    try {
      await sessions.remove(session.id)
      open = false
      notifications.add({ text: `Session deleted`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete session'`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }
  const dateString = (date) => {
    return formatRelative(new Date(date), new Date())
  }
</script>

<ConfirmDelete name="session" on:delete={handleDelete} {errors} {loading} bind:open>
  <span>
    the session which takes place {dateString(session.startsAt)} with {session.group.name} class?
  </span>
</ConfirmDelete>