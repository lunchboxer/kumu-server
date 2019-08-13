<script>
  import { formatRelative } from 'date-fns'
  export let attendance

  const format = (date) => {
    if (!date) return
    return formatRelative(new Date(date), new Date())
  }
</script>

<style>
  p {
    margin: 0;
  }

  .lesson {
    margin: 1rem 0;
  }
</style>

<div class="lesson">
  <p>
    <a href="#/session/{attendance.classSession.id}">
      {attendance.classSession.group.name} class lesson
      {attendance.classSession.number}
      {#if attendance.classSession.lesson}
      - {attendance.classSession.lesson.name}
      {/if}
    </a>
    {#if attendance.status !== 'Present'}
      ({attendance.status.toLowerCase()})
    {/if}
  </p>
  <p>
    {#if !attendance.classSession.endedAt}
      Scheduled to end {format(attendance.classSession.endsAt)}
    {:else if attendance.classSession.endedAt}
      {format(attendance.classSession.endedAt)}
    {/if}
  </p>
</div>