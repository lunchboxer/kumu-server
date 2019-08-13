<script>
  import { notifications } from '../notifications'
  import { tags } from './data.js'
  import Error from '../Error.svelte'
  import TagForm from './TagForm.svelte'

  let name = ''
  let errors = ''
  let loading = false

  const reset = () => {
    errors = ''
    name = ''
  }

  const handleSubmit = async ({ detail }) => {
    if (!detail.name) return
    loading = true
    try {
      // check if name already exists
      if ($tags && $tags.find(t => t.name === detail.name)) {
        throw new Error(`The tag '${detail.name}' already exists.`)
      }
      await tags.create(detail.name)
      notifications.add({ text: `Saved new tag '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new tag.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<TagForm {errors} {loading} on:submit={handleSubmit} on:reset={reset} bind:name />