<script>
  import { lesson } from './data'
  import { notifications } from '../notifications'

  export let material

  const toggle = async () => {
    const input = {}
    let text = 'Removed material from lesson'
    if (isAdded) {
      input.materials = { disconnect: { id: material.id } }
    } else {
      text = 'Added material to lesson'
      input.materials = { connect: { id: material.id } }
    }
    try {
      await lesson.patch({ id: $lesson.id, input })
      notifications.add({ text, type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }

  $: isAdded = !!$lesson.materials.find(m => m.id === material.id)
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
    {material.title} - {material.type}
  </label>
</li>