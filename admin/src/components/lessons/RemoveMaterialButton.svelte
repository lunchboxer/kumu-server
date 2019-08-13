<script>
  import { lesson } from './data'
  import { notifications } from '../notifications'

  export let materialId

  const remove = async () => {
    const input = { materials: { disconnect: { id: materialId } } }
    try {
      await lesson.patch({ id: $lesson.id, input })
      notifications.add({ text: 'Removed material from lesson', type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<button class="delete" on:click={remove}></button>