<script>
  import { semesters } from './data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import SemesterForm from './SemesterForm.svelte'

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
      await semesters.create(detail)
      notifications.add({ text: `Saved new semester '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new semester.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-primary" on:click={() => { open = true }}>Add semester</button>
<Modal bind:open>
  <SemesterForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>