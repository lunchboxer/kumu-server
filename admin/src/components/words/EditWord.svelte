<script>
  import { words } from './data'
  import { notifications } from '../notifications'
  import WordForm from './WordForm.svelte'
  import Modal from '../Modal.svelte'

  let loading = false
  let errors = ''
  let open = false
  export let word

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await words.patch({ input: detail, id: word.id })
      notifications.add({ text: `Saved edits to word '${detail.english}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save word.',
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
    <WordForm 
      english={word.english} 
      audio={word.audio} 
      chinese={word.chinese} 
      {errors} 
      {loading} 
      on:submit={save} 
      on:reset={reset} 
    />
  {/if}
</Modal>