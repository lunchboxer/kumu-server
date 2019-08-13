<script>
  import { onMount } from 'svelte'
  import { lessons } from '../lessons/data'
  import FilterItems from '../FilterItems.svelte'

  export let lessonId = ''

  onMount(async () => {
    await lessons.get()
  })
</script>

<style>
  .lesson-select {
    margin-bottom: 1rem;
  }
</style>

<div class="lesson-select">
  <FilterItems store={lessons} />

  <div class="select">
    <select bind:value={lessonId}>
      {#if $lessons}
      <option value="">{$lessons.length} matching lessons</option>
      {#each $lessons as lesson (lesson.id)}
        <option value={lesson.id} selected={lesson.id === lessonId}>{lesson.name}</option>
      {/each}
      {:else}
      <option value="">Loading lessons...</option>
      {/if}
    </select>
  </div>
</div>