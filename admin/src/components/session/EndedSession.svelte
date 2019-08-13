<script>
  import { session, getResults } from './data'
  import { time } from '../../data/timer'
  import { formatDistance, format } from 'date-fns'
  import DL from '../DL.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import ResultsRow from './ResultsRow.svelte'
  import EditTimes from './EditTimes.svelte'
  import AddLessonToSession from './AddLessonToSession.svelte'
  import Report from '../report/Report.svelte'

  export let id

  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })

  const formatTime = (time) => {
    if (!time) return
    const dateTime = new Date(time)
    if (dateTime.getMinutes() === 0) {
      return format(dateTime, 'h b')
    }
    return format(dateTime, 'p')
  }
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<svelte:head>
  <title>Ended Session</title>
</svelte:head>

<p class="subtitle">Ended {endedDistance}</p>

<DL>
  <dt>Schedule start:</dt>
  <dd>{formatTime($session.startsAt)}</dd>

  <dt>Actual start:</dt>
  <dd>{formatTime($session.startedAt)}</dd>

  <dt>Schedule end:</dt>
  <dd>{formatTime($session.endsAt)}</dd>

  <dt>Actual end:</dt>
  <dd>{formatTime($session.endedAt)}</dd>
</DL>

<EditTimes />

{#await getResults(id)}
  <Loading what="results"/>
{:then results}
  <section class="results">
    <h3 class="title is-4">Results</h3>
    <ul>
      {#each results as result (result.id)}
        <ResultsRow {result} />
      {/each}
    </ul>
  </section>
{:catch errors}
  <Error {errors} />
{/await}

<setion class="lesson">
  <h3 class="title is-4">Lesson</h3>
  {#if !$session.lesson}
    <p>No lesson has been selected yet.</p>
    <AddLessonToSession id={$session.id} />
    {:else}
    <p>{$session.lesson.name}</p>
  {/if}
</setion>

<Report />