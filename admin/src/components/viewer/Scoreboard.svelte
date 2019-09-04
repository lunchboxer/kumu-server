<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { session, sessionStudents, sessionId } from '../session/data'
  import { points } from './data'
  import ScoreboardRow from './ScoreboardRow.svelte'
  import { POINTS_SUB } from '../session/queries'

  let newPoint = null

  const yay = new Audio('sounds/ui-confirmation-alert-a5min.wav')
  const boo = new Audio('sounds/quick-fart.wav')
  const opening = new Audio('sounds/gamelan_glissando_upward_002_538.mp3')

  $: console.log($sessionStudents)
  onMount(() => {
    opening.play()
    const subscription = ws
      .request({
        query: POINTS_SUB,
        variables: { classSessionId: $session.id }
      })
      .subscribe({
        next(message) {
          if (message.data && message.data.points) {
            const { node, mutation, previousValues } = message.data.points
            if (mutation === 'CREATED') pointAdded(node)
            if (mutation === 'DELETED') {
              points.update(previous => {
                return previous.filter(point => point.id !== previousValues.id)
              })
            }
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
  const setNewPoint = point => {
    newPoint = point
    setTimeout(() => {
      newPoint = null
    }, 1000)
  }

  const pointAdded = point => {
    setNewPoint(point)
    if (point.value > 0) {
      yay.play()
    } else {
      boo.play()
    }

    points.update(previous => {
      return [point, ...previous]
    })
  }
</script>

<style>
  section {
    height: calc(100vh - 10rem);
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
</style>

<h2 class="title">{$session.group.name} class lesson {$session.number}</h2>

{#if $sessionStudents}
<section class="scoreboard">
  <ul>
    {#each $sessionStudents as student (student.id)} <ScoreboardRow {student}
    sessionId={$sessionId} glow={newPoint && newPoint.student.id === student.id}
    /> {/each}
  </ul>
</section>
{/if}