<script>
  import { sessions } from '../sessions/data'
  import { notifications } from '../notifications'

  export let materialId
  export let classSessionId

  const remove = async () => {
    const input = { report: { update: { materials: { disconnect: { id: materialId } } } } }
    try {
      await sessions.patch(classSessionId, input)
      notifications.add({ text: 'Removed material from session report', type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<button class="delete" on:click={remove}></button>