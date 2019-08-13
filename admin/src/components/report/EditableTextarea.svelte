<script>
  import { notifications } from '../notifications'
  import { sessions } from '../sessions/data'
  import { session } from '../session/data'
  import marked from 'marked'

  export let text = ''
  let original = text && text.slice(0)
  export let key = ''

  let input
  let edit = true
  let alreadySet = false
  let loading = false
  let errors = ''

  const inputHandler = (event) => {
    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
  }

  // adjust the height when component loads
  $: if (!alreadySet && input) {
    inputHandler()
    alreadySet = true
  }

  const save = async () => {
    loading = true
    const input = { report: { update: { [key]: text } } }
    try {
      await sessions.patch($session.id, input)
      notifications.add({ text: 'Successfuly saved changes', type: 'success' })
      errors = ''
      original = text.slice(0)
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't save changes", type: 'danger' })
    } finally {
      loading = false
    }
  }

  const toggleEdit = () => {
    edit = !edit
    if (edit) alreadySet = false
  }

  const discardChanges = () => {
    text = original.slice(0)
  }
</script>

<style>
  :global(p) {
    margin: 1rem 0 1rem;
  }

  .textarea {
    background: inherit;
    color: white;
    resize: none;
    overflow: hidden;
    min-height: 1rem;
    margin: 0.5rem 0;
  }
</style>

<div class="buttons">
  {#if edit}
    <button class="button" on:click={toggleEdit}><i class="fas fa-eye" ></i>Preview</button>
  {:else}
    <button class="button" on:click={toggleEdit}><i class="fas fa-edit"></i>Edit</button>
  {/if}
  {#if text !== original}
    <button class="button is-danger" on:click={discardChanges}><i class="fas fa-history"></i>Discard changes</button>
    <button class="button is-primary" on:click={save} class:is-loading={loading}><i class="fas fa-save"></i>Save changes</button>
  {/if}
</div>

{#if edit}
  <textarea bind:this={input} class='textarea' bind:value={text} on:input={inputHandler}></textarea>
{:else}
  {@html marked(text, { breaks: true })}
{/if}