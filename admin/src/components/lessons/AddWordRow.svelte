<script>
  import { lesson } from './data'
  import { notifications } from '../notifications'

  export let word
  $: isAdded = !!$lesson.words.find(w => w.id === word.id)

  const toggle = async () => {
    const input = {}
    let text = 'Removed word from lesson'
    if (isAdded) {
      input.words = { disconnect: { id: word.id } }
    } else {
      text = 'Added word to lesson'
      input.words = { connect: { id: word.id } }
    }
    try {
      await lesson.patch({ id: $lesson.id, input })
      notifications.add({ text, type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style>
  li {
    list-style: none;
    display: flex;
  }

  i {
    margin: 0.2rem 0.5rem;
  }
</style>

<li on:click={toggle}>
  <label class="checkbox">
    <i class="fas fa-{isAdded ? 'check-' : ''}square status"></i>
    {word.english} ({word.chinese})
  </label>
</li>