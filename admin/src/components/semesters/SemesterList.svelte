<script>
  import { semesters } from './data'
  import SemesterListRow from './SemesterListRow.svelte'
</script>

<style>
  .semester-list {
    margin: 1rem 0;
  }

  p {
    margin: 1rem 0;
  }
</style>

{#if $semesters && $semesters.length}
<div class="semester-list">
	<p>There are {$semesters.length} semesters in the system.</p>
  {#each $semesters as semester (semester.id)}
	<SemesterListRow {semester}></SemesterListRow>
	{/each}
</div>
{/if}