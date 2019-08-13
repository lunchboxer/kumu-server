<script>
  import ClassSessionListRow from './ClassSessionListRow.svelte'
  export let attendances = []
</script>

{#if attendances.length > 0}
  <p>Showing {attendances.length} lessons.</p>
  {#each attendances as attendance (attendance.id)}
    <ClassSessionListRow {attendance} />
  {/each}
{:else}
<p>No lessons yet</p>
{/if}