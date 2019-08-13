<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import LessonList from './LessonList.svelte'
  import { lessons } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import FilterItems from '../FilterItems.svelte'

  let errors = ''

  onMount(async () => {
    try {
      await lessons.get()
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get lessons from server.", type: 'danger' })
    }
  })
</script>

<style>
</style>

<svelte:head>
  <title>Lessons</title>
</svelte:head>

<h1 class="title">Lessons</h1>

<Error {errors} />

<a href="#/new-lesson" class="button is-primary create-lesson">
  <i class="fas fa-plus"></i>Create new lesson
</a>

<FilterItems searchParams='name' store={lessons} />

{#if $lessons}
  <LessonList />
{:else if !errors}
  <Loading what="lessons"/>
{/if}