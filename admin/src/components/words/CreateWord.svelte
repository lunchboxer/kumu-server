<script>
  import { words } from './data'
  import { notifications } from '../notifications'
  import WordForm from './WordForm.svelte'
  import Modal from '../Modal.svelte'

  let loading = false
  let errors = ''
  let open = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await words.create(detail)
      notifications.add({ text: `Saved new word '${detail.english}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new word.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Add word</button>
<Modal bind:open>
  <WordForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>