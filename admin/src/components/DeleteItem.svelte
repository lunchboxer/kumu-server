<script>
  import { pop, push } from 'svelte-spa-router'
  import ConfirmDelete from './ConfirmDelete.svelte'
  import { notifications } from './notifications'
  import Modal from './Modal.svelte'

  export let id
  export let store
  export let type = ''
  export let name = ''
  export let open = false
  let errors = ''
  let loading = false
  export let next = ''

  const handleDelete = async () => {
    loading = true
    try {
      await store.remove(id)
      next ? push(next) : pop()
      open = false
      notifications.add({ text: `${type} '${name}' deleted`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete ${type} '${name}'`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<Modal bind:open>
  {#if open}
  <ConfirmDelete name={type} on:delete={handleDelete} {errors} {loading} bind:open>
    the {type} '{name}'
  </ConfirmDelete>
  {/if}
</Modal>