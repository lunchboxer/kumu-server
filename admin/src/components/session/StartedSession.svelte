<script>
  import { session, sessionStudents, pointsLog, points } from './data'
  import { time } from '../../data/timer'
  import Modal from '../Modal.svelte'
  import ConfirmEndSession from './ConfirmEndSession.svelte'
  import { formatDistance } from 'date-fns'
  import AttendanceRow from './AttendanceRow.svelte'
  import PointsPanel from './PointsPanel.svelte'

  let showEndModal = false

  $: startedAt = formatDistance(new Date($session.startedAt), new Date(), { addSuffix: true })
  $: endsAt = formatDistance(new Date($session.endsAt), new Date(), { addSuffix: true })
  $: absentStudents = $sessionStudents && $sessionStudents.filter(student => {
    return student.attendance && student.attendance.status === 'Absent'
  })
</script>

<style>
  .late {
    color: red;
  }

  section {
    margin: 1rem 0;
  }

  button.end {
    margin-top: 1rem;
  }
</style>

<svelte:head>
  <title>Started Session</title>
</svelte:head>

<p class="subtitle">
  <span class="start">Started: {startedAt}</span>
  <br>
  <span class="end" class:late={$session.endsAt < $time.toJSON()}>Scheduled End: {endsAt}</span>
</p>
{#if $pointsLog && $pointsLog.length}
  <button class="button is-white" on:click={() => points.undo($pointsLog[0].id)}>
    <i class="fas fa-undo"></i>
    Undo {$pointsLog[0].value} point{$pointsLog[0].value - 1 && 's' || ''} for {$pointsLog[0].student.englishName || $pointsLog[0].student.chineseName}
  </button>
{/if}

{#if $sessionStudents}
  <PointsPanel sessionId={$session.id} />

  {#if absentStudents && absentStudents.length}
  <section class="absent">
    <h3 class="title is-4">Absent</h3>
    {#each absentStudents as student (student.id)}
      <AttendanceRow {student} sessionId={$session.id} started="true" />
    {/each}
  </section>
  {/if}
{/if}

<button class="button is-primary end" on:click={() => { showEndModal = true }}>
  <i class="fas fa-hourglass-end"></i>
  End class
</button>

<Modal bind:open={showEndModal}>
    {#if showEndModal}
      <ConfirmEndSession bind:open={showEndModal} />
    {/if}
  </Modal>