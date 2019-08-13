<script>
  import { sessions } from '../sessions/data'
  import { notifications } from '../notifications'

  export let wordId
  export let classSessionId

  const remove = async () => {
    const input = { report: { update: { words: { disconnect: { id: wordId } } } } }
    try {
      await sessions.patch(classSessionId, input)
      notifications.add({ text: 'Removed word from report', type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<button class="delete" on:click={remove}></button>