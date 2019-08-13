<script>
  import { session } from './data'
  import Error from '../Error.svelte'
  import { format, formatDistance } from 'date-fns'
  import { request } from '../../data/fetch-client'
  import { END_CLASS } from './mutations'

  export let open = false
  let errors = ''
  let loading = false

  const handleEnd = () => {
    try {
      request(END_CLASS, { id: $session.id, now: new Date() })
    } catch (error) {
      errors = error
    }
  }
  const endsAt = format(new Date($session.endsAt), 'p')
  const endsAtDistance = formatDistance(new Date($session.endsAt), new Date(), { addSuffix: true })
  const startDifference = () => {
    const starts = new Date($session.startsAt)
    const started = new Date($session.startedAt)
    const diff = starts - started
    const diffString = formatDistance(starts, started)
    const direction = diff > 0 ? 'early' : 'late'
    return `${diffString}  ${direction}`
  }
</script>

<style>
  .buttons {
    margin-top: 2rem;
    float: right;
  }
</style>

<h1 class="title">End {$session.group.name} class lesson {$session.number}</h1>
<Error {errors} />
<p>Scheduled end: {endsAt} ({endsAtDistance})</p>
<p>Class started {startDifference()}</p>
<br>
<p>Sure you want to end class now?</p>
<div class="buttons">
  <button class="button is-primary" disabled={loading} class:is-loading={loading} on:click={handleEnd}>
    <i class="fas fa-thumbs-up"></i>
    End class
  </button>
  <button class="button" on:click={() => { open = false }}>Nevermind</button>
</div>