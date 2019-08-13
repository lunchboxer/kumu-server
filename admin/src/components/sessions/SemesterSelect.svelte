<script>
  import { onMount } from 'svelte'
  import { semesters } from '../semesters/data'
  import { semester } from './data'

  let semesterSelect

  onMount(async () => {
    await semesters.get()
    if (!$semester) { // not already chosen then get default
      const now = new Date().toISOString()
      const current = $semesters.find(s => s.startDate < now && s.endDate > now)
      if (current) {
        semester.set(current)
      }
    }
  })

  const handleChange = () => {
    const chosen = $semesters.find(s => s.id === semesterSelect.value)
    semester.set(chosen)
  }
</script>

<style>
  .select {
    margin-bottom: 1rem;
  }
</style>

<div class="select">

  <select value={$semester && $semester.id} on:change={handleChange} bind:this={semesterSelect}>
    {#if $semesters}
    {#each $semesters as {id, name} (id)}
    <option value={id}>{name}</option>
    {/each}
    {:else}
    <option value="">Loading semesters...</option>
    {/if}
  </select>
</div>