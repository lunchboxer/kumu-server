<script>
  import { onMount } from 'svelte'
  import { session, getResults } from '../session/data'
  import { time } from '../../data/timer'
  import { formatDistance } from 'date-fns'
  import Loading from '../Loading.svelte'

  let results = null

  onMount(async () => {
    results = await getResults($session.id)
  })

  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })

  const groupByPoints = results => {
    if (!results || results.length === 0) return []
    const grouped = results.reduce((acc, student) => {
      const group = student.pointsTally
      acc[group] = acc[group] || []
      acc[group].push(student)
      return acc
    }, {})
    const sortedPoints = Object.keys(grouped).sort((a, b) => b - a)
    return sortedPoints.map((point, i) => {
      return { total: parseInt(point), students: grouped[point] }
    })
  }
  const listNames = group => {
    const names = group.map(x => x.student.englishName || x.student.chineseName)
    return [names.slice(0, -1).join(', '), names.slice(-1)[0]].join(names.length < 2 ? '' : ' and ')
  }

  $: groupedResults = groupByPoints(results)
</script>

<style>
  .results {
    padding: 2rem;
  }

  div.winner {
    border: 6px solid greenyellow;
    padding: 2rem 0;
    margin-bottom: 2rem;
    width: auto;
    text-align: center;
    border-radius: 3rem;
    box-shadow:
      0 0 0 10px black,
      0 0 0 12px white;
    display: flex;
    justify-content: center;
    align-items: baseline;
  }

  .big {
    font-size: 8rem;
    margin: 0 2rem;
  }

  p {
    font-size: 6rem;
    margin-bottom: 0.4rem;
  }

  i.fa-star {
    color: gold;
    animation: bounce 700ms linear 500ms infinite;
    transform-origin: center bottom;
  }

  @keyframes bounce {

    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
</style>

<audio preload autoplay>
  <source type='audio/mp3' src='sounds/gamelan_glissando_downward_004_536.mp3'>
</audio>

<h2 class="title">{$session.group.name} class lesson {$session.number} ended {endedDistance}</h2>

<section class="results">
  {#if results}
    {#each groupedResults as group, i (group.total)}
      {#if i === 0}
        <div class="winner">
          <p class="big"><i class="fas fa-star bounce"></i>&times;{group.total} {listNames(group.students)}</p>
        </div>
      {:else}
        <p>{group.total} stars: {listNames(group.students)}</p>
      {/if}
    {/each}
  {:else}
    <Loading what="results" />
  {/if}
</section>

<span class="bounce"></span>