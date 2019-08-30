<script>
  import { student } from '../data/stores'
  import ClassSessionList from './ClassSessionList.svelte'
  import { title } from './Header.svelte'

  title.set('果园英语')
</script>

{#if $student && $student.attendances}
  <h2>{$student.englishName}'s lessons</h2>
  {#if $student.attendances}
    <ClassSessionList attendances={$student.attendances} />
  {/if}
{:else}
  <p>Loading student data...</p>
{/if}