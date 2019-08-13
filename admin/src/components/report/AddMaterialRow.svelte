<script>
  import { sessions } from '../sessions/data'
  import { session } from '../session/data'
  import { notifications } from '../notifications'

  export let material

  const toggle = async () => {
    const input = { report: { update: {} } }
    let text = 'Removed material from report'
    if (isAdded) {
      input.report.update.materials = { disconnect: { id: material.id } }
    } else {
      text = 'Added material to report'
      input.report.update.materials = { connect: { id: material.id } }
    }
    try {
      await sessions.patch($session.id, input)
      notifications.add({ text, type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }

  $: isAdded = !!$session.report.materials.find(m => m.id === material.id)
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