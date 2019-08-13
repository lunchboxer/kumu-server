<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { lesson, lessons } from './data'
  import { notifications } from '../notifications'
  import LessonForm from './LessonForm.svelte'
  import Loading from '../Loading.svelte'

  let loading = false
  let errors = ''
  export let params = {}

  onMount(async () => {
    if (!$lesson || $lesson.id === params.id) {
      try {
        await lesson.get(params.id)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch lesson from the server', type: 'danger' })
      }
    }
  })

  const reset = () => {
    errors = ''
    push(`/lesson/${params.id}`)
  }

  const save = async ({ detail }) => {
    console.log(detail)
    loading = true
    try {
      await lessons.patch(detail, params.id)
      notifications.add({ text: `Saved edits to lesson '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save lesson.',
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

<h1 class="title">Edit a Lesson</h1>

{#if lesson}
  <LessonForm on:reset={reset} on:submit={save} {errors} {loading} {...$lesson} id={params.id} />
{:else}
  <Loading what="lesson"/>
{/if}