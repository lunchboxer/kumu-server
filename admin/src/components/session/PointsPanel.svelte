<script>
  import { sessionStudents } from './data'
  import PointsRow from './PointsRow.svelte'

  export let sessionId
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<section class="points">
  <h3 class="title is-4">Points</h3>
  <ul>
    {#each $sessionStudents as student (student.id)}
    {#if student.attendance && student.attendance.status !== "Absent"}
      <PointsRow {student} {sessionId} />
    {/if}
  {/each}
  </ul>
</section>