<script>
  import { request } from '../../data/fetch-client'
  import { UPDATE_ATTENDANCE } from './mutations'

  export let student = {}
  export let sessionId = null
  export let started = false

  const updateAttendance = () => {
    const status = present ? 'Absent' : started ? 'Late' : 'Present'
    try {
      request(UPDATE_ATTENDANCE, { classSessionId: sessionId, studentId: student.id, status })
    } catch (error) {
      console.error(error)
    }
  }
  $: present = !(!student.attendance || student.attendance.status === 'Absent')
</script>

<style>
  li {
    font-size: 1.6rem;
    list-style: none;
    padding: 0.5rem 0;
    cursor: pointer;
  }

  i.status {
    margin-right: 0.5rem;
  }

  li.absent {
    color: rgba(255, 255, 255, 0.5);
  }
</style>

<li on:click={updateAttendance} class:absent={!present}>
  <i class="fas fa-{present ? 'check' : 'dot'}-circle status"></i>
  <span class="name">{student.englishName || student.chineseName}</span>
</li>