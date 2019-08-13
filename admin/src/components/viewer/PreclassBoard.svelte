<script>
  import { formatDistanceStrict } from 'date-fns'
  import { session, sessionStudents } from '../session/data'
  import { time } from '../../data/timer'
  import TextStretcher from '../TextStretcher.svelte'

  const timeToStart = (startsAt, now) => {
    return formatDistanceStrict(new Date(startsAt), now, { addSuffix: true })
  }
  const timeDirection = (startsAt, now) => {
    return new Date(startsAt) - now
  }
  $: absentStudents = $sessionStudents && $sessionStudents.filter(student => {
    return !student.attendance || student.attendance.status !== 'Present'
  }).map(student => (student.englishName || student.chineseName)).join(', ')
</script>

<style>
  main {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .late {
    color: #ff3344;
  }
</style>

<main>
  <TextStretcher text="{$session.group.name} class lesson {$session.number}" maxSize="300" />
  <div class:late={timeDirection($session.startsAt, $time) < 0}>
    <TextStretcher text="{timeDirection($session.startsAt, $time) > 0 ? 'starts' : 'scheduled to start'}
        {timeToStart($session.startsAt, $time)}" />
  </div>

  {#if absentStudents}
    <TextStretcher text="waiting on {absentStudents}" minSize="32" maxSize="156" />
  {/if}
</main>