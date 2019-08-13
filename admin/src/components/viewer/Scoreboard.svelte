<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { session, sessionStudents, sessionId } from '../session/data'
  import { points } from './data'
  import ScoreboardRow from './ScoreboardRow.svelte'
  import { POINTS_SUB } from '../session/queries'

  let newPoint = null

  onMount(() => {
    const opening = new Audio('sounds/gamelan_glissando_upward_002_538.mp3')
    opening.play()
    const subscription = ws.request({ query: POINTS_SUB, variables: { classSessionId: $session.id } })
      .subscribe({
        next (message) {
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
  const setNewPoint = (point) => {
    newPoint = point
    setTimeout(() => { newPoint = null }, 1000)
  }

  const pointAdded = (point) => {
    setNewPoint(point)
    if (point.value > 0) {
      const yay = new Audio('sounds/ui-confirmation-alert-a5min.wav')
      yay.play()
    } else {
      const boo = new Audio('sounds/quick-fart.wav')
      boo.play()
    }

    points.update(previous => {
      return [point, ...previous]
    })
  }
</script>

<style>
  section {
    height: calc(100vh - 6rem);
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
</style>

<audio preload>
  <source type='audio/wav' src='sounds/ui-confirmation-alert-a5min.wav'>
</audio>
<audio preload>
  <source type='audio/mp3' src='sounds/gamelan_glissando_upward_002_538.mp3'>
</audio>
<audio preload>
  <source type='audio/wav' src='sounds/quick-fart.wav'>
</audio>

<h2 class="title">{$session.group.name} class lesson {$session.number}</h2>

{#if $sessionStudents}
<section class="scoreboard">
  <ul>
    {#each $sessionStudents as student (student.id)}
      <ScoreboardRow 
        {student} 
        sessionId={$sessionId} 
        glow={newPoint && newPoint.student.id === student.id}
      />
    {/each}
    </ul>
</section>
{/if}