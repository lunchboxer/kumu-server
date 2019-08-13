<script>
  import { lesson } from './data'
  import { notifications } from '../notifications'

  export let wordId

  const remove = async () => {
    const input = { words: { disconnect: { id: wordId } } }
    try {
      await lesson.patch({ id: $lesson.id, input })
      notifications.add({ text: 'Removed word from lesson', type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<button class="delete" on:click={remove}></button>