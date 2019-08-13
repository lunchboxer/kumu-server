<script>
  import { sessionStudents, session } from './data'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import AttendanceRow from './AttendanceRow.svelte'
  import { request } from '../../data/fetch-client'
  import { MARK_ALL_PRESENT } from './mutations'

  let errors = ''

  const markAllPresent = () => {
    try {
      request(MARK_ALL_PRESENT, { classSessionId: $session.id })
    } catch (error) {
      errors = error
    }
  }
</script>

<style>
  section {
    margin: 1rem 0;
  }

  button {
    margin-bottom: 1rem;
  }
</style>

<section class="attendance-form">
  <Error {errors} />

  <button class="button is-primary is-inverted" on:click={markAllPresent}><i class="fas fa-clipboard-check"></i>All
    present</button>
  {#if $sessionStudents}
      {#if $sessionStudents.length}
        {#each $sessionStudents as student (student.id)}
          <AttendanceRow {student} sessionId={$session.id} />
        {/each}
      {:else}
        <p>No students were found for this class session.</p>
      {/if}
    {:else}
      <Loading what="students" />
    {/if}
</section>