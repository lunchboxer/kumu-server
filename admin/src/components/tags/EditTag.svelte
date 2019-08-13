<script>
  import { tags } from './data'
  import { notifications } from '../notifications'
  import TagForm from './TagForm.svelte'
  import TagConnectionsList from './TagConnectionsList.svelte'

  export let openTag
  let errors = ''
  let loading = false

  const reset = () => {
    errors = ''
    openTag = false
  }

  const handleSubmit = async ({ detail }) => {
    loading = true
    try {
      // check if name already exists
      if ($tags && $tags.find(t => t.name === detail.name)) {
        throw new Error(`The tag '${detail.name}' already exists.`)
      }
      await tags.patch({ id: detail.id, input: { name: detail.name } })
      notifications.add({ text: `Updated tag to '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not update tag.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<h2 class="title">Tag details</h2>

<TagForm {errors} {loading} on:submit={handleSubmit} on:reset={reset} {...openTag} />

{#if openTag.connections}
  <TagConnectionsList id={openTag.id} />
{/if}