<script>
  import { sessions } from '../sessions/data'
  import { session } from '../session/data'
  import { notifications } from '../notifications'

  export let word
  $: isAdded = !!$session.report.words.find(w => w.id === word.id)

  const toggle = async () => {
    const input = { report: { update: {} } }
    let text = 'Removed word session vocabulary'
    if (isAdded) {
      input.report.update.words = { disconnect: { id: word.id } }
    } else {
      text = 'Added word to session vocabulary'
      input.report.update.words = { connect: { id: word.id } }
    }
    try {
      await sessions.patch($session.id, input)
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