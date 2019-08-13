<script>
  import { push } from 'svelte-spa-router'
  import { lessons } from './data'
  import { notifications } from '../notifications'
  import LessonForm from './LessonForm.svelte'

  let loading = false
  let errors = ''

  const reset = () => {
    errors = ''
    push('/lessons')
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await lessons.create(detail)
      notifications.add({ text: `Saved new lesson '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new lesson.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>New Lesson</title>
</svelte:head>

<h1 class="title">New Lesson</h1>

<LessonForm on:reset={reset} on:submit={save} {errors} {loading} />