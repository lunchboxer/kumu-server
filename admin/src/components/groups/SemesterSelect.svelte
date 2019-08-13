<script>
  import { onMount } from 'svelte'
  import { semesters } from '../semesters/data'

  let selectElement
  let error = ''
  export let edit = false
  export let value = ''

  onMount(() => {
    if (!$semesters || $semesters.length === 0) {
      semesters.get()
    }
  })

  function checkValidity () {
    error = !selectElement.validity.valid && selectElement.validationMessage
      ? selectElement.validationMessage
      : ''
  }
</script>

<style>
  .select {
    margin-bottom: 1rem;
  }
</style>

<label class="label">Semester</label>
{#if edit}
<p class="help is-warning">Be careful! Only change if there aren't any class sessions.</p>
{/if}
<div class="select">
  <select bind:value required bind:this={selectElement} on:invalid|preventDefault={checkValidity}>
    {#await $semesters}
        <option>Loading semesters ...</option>
      {:then result}
        {#if result && result.length}
          <option value="">--</option>
          {#each result as semester}
            <option value={semester.id} selected={semester.id === value}>{semester.name}</option>
          {/each}
        {/if}
      {:catch}
        <option>Loading semesters ...</option>
      {/await}
    </select>
    {#if error}
    <p class="help is-danger">{error}</p>
    {/if}
  </div>