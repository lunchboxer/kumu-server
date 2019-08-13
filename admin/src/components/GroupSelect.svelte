<script>
  import { onMount } from 'svelte'
  import { request } from '../data/fetch-client'
  import { ACTIVE_GROUPS } from '../data/queries'

  export let groups = null
  let selectElement
  let errors = ''
  export let groupId = ''
  export let required = false

  onMount(async () => {
    if (!groups) {
      try {
        const result = await request(ACTIVE_GROUPS)
        groups = !result ? [] : result.activeGroups
      } catch (error) {
        errors = error
      }

   }
  })

  function checkValidity () {
    errors = !selectElement.validity.valid && selectElement.validationMessage
      ? selectElement.validationMessage
      : ''
  }
</script>

<style>
  .field {
    margin-bottom: 1rem;
  }
</style>

<div class="field">
  <div class="select">
    <select bind:value={groupId} bind:this={selectElement} class:is-loading={!groups}
      on:invalid|preventDefault={checkValidity} {required}>
      {#if groups}
      {#if groups.length}
      <option value="">Select group...</option>
      {#each groups as group}
        <option value={group.id}>{group.semester ? group.semester.name + ' ': ""}{group.name} class</option>
      {/each}
      {:else}
      <option>No active groups</option>
      {/if}
    {:else}
      <option>Loading groups ...</option>
    {/if}
  </select>
</div>
{#if errors} 
<p class="help is-danger">{JSON.stringify(errors)}</p>
{/if}
</div>