<script>
  import { materials } from './data'
  import { notifications } from '../notifications'
  import MaterialForm from './MaterialForm.svelte'
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
      await materials.create(detail)
      notifications.add({ text: `Saved new material '${detail.title}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new material.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Add material</button>
<Modal bind:open>
  <MaterialForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>