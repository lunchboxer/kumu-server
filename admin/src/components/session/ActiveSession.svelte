<script>
  import { formatDistance } from 'date-fns'
  import { session } from './data'
  import { request } from '../../data/fetch-client'
  import { START_CLASS } from './mutations'
  import Error from '../Error.svelte'
  import { time } from '../../data/timer'
  import AttendanceForm from './AttendanceForm.svelte'

  let errors = ''

  const startClass = () => {
    const now = new Date().toISOString()
    try {
      request(START_CLASS, { id: $session.id, now })
    } catch (error) {
      errors = error
    }
  }

  $: distance = $session &&
    $time &&
    formatDistance(new Date($session.startsAt), $time, { addSuffix: true })
</script>

<style>
  .late {
    color: red;
  }
</style>

<svelte:head>
  <title>Active Session</title>
</svelte:head>

<p class="subtitle" class:late={$session.startsAt < $time.toJSON()}>Scheduled start time: {distance}</p>
<Error {errors} />
<AttendanceForm />
<button class="button is-primary" on:click={startClass}>
  <i class="fas fa-play-circle"></i>
  Start class
</button>