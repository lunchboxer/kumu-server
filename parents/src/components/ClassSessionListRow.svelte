<script>
  import { formatRelative } from 'date-fns'
  import { zhCN } from 'date-fns/locale'
  export let attendance

  const format = (date) => {
    if (!date) return
    return formatRelative(new Date(date), new Date(), { locale: zhCN })
  }

  const attendanceStatus = (status) => {
    if (status === 'Absent') return '没上课'
    if (status === 'Late') return '迟到'
  }
</script>

<style>
  p {
    margin: 0;
  }

  .lesson {
    margin: 1rem 0;
  }

  h3 {
    margin-bottom: 0;
  }
</style>

<div class="lesson">
  <a href="#/session/{attendance.classSession.id}">
    <h3>
      {attendance.classSession.group.name}班第{attendance.classSession.number}课
      {#if attendance.classSession.lesson}
      - {attendance.classSession.lesson.name}
      {/if}
    </h3>
  </a>
  
  <p>
    {#if !attendance.classSession.endedAt}
      Scheduled to end {format(attendance.classSession.endsAt)}
    {:else if attendance.classSession.endedAt}
      {format(attendance.classSession.endedAt)}
    {/if}
    {#if attendance.status !== 'Present'}
      ({attendanceStatus(attendance.status)})
    {/if}
  </p>
</div>