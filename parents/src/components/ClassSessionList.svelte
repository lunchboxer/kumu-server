<script>
  import ClassSessionListRow from './ClassSessionListRow.svelte'
  import { title } from './Header.svelte'

  export let attendances = []
  title.set('本学期课程')
</script>

{#if attendances.length > 0}
  <p>本学期上过{attendances.length}节课。</p>
  {#each attendances as attendance (attendance.id)}
    <ClassSessionListRow {attendance} />
  {/each}
{:else}
  <p>No lessons yet</p>
{/if}