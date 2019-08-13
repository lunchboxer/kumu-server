<script>
  import { onMount } from 'svelte'
  import { students } from './data'
  import { request } from '../../data/fetch-client'
  import { CURRENT_NEXT_SEMESTER_GROUPS } from '../../data/queries'
  import StudentListItem from './StudentListItem.svelte'
  import FilterStudents from './FilterStudents.svelte'
  import AddStudent from './AddStudent.svelte'

  let semesters

  onMount(async () => {
    semesters = await request(CURRENT_NEXT_SEMESTER_GROUPS)
  })
</script>

<style>
  .student-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  div {
    margin-top: 1rem;
  }

  .details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
</style>

<p class='student-number'>Showing {$students && $students.length} students.</p>

<div>
  <div class="details">
    <AddStudent />
    <FilterStudents />
  </div>

  {#if $students && $students.length && semesters}

    <div class="student-list">
      {#each $students as student (student.id)}
      <StudentListItem {student} {semesters} />
      {/each}
    </div>
{/if}
</div>