<script>
  import { materials } from './data'
  import { notifications } from '../notifications'
  import MaterialForm from './MaterialForm.svelte'
  import Modal from '../Modal.svelte'

  let loading = false
  let errors = ''
  let open = false
  export let material

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await materials.patch({ input: detail, id: material.id })
      notifications.add({ text: `Saved edits to material '${detail.title}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save edits to material.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-primary" on:click={ () => { open = true }}>
  <i class="fas fa-edit"></i>Edit
</button>

<Modal bind:open>
  {#if open}
    <MaterialForm 
      title={material.title} 
      url={material.url}
      id={material.id}
      type={material.type}
      notes={material.notes}
      {errors} 
      {loading} 
      on:submit={save} 
      on:reset={reset} 
    />
  {/if}
</Modal>