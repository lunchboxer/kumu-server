<script>
  import { groups } from './data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import GroupForm from './GroupForm.svelte'

  let errors = ''
  let loading = false
  let open = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    const { semesterId, name } = detail
    loading = true
    try {
      await groups.create(name, semesterId)
      notifications.add({ text: `Added new class '${name} class'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could not save changes to group', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-primary" on:click={()=> open = true }>
  <i class="fas fa-plus"></i>&nbsp;Add a group
</button>

<Modal bind:open>
  <GroupForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>