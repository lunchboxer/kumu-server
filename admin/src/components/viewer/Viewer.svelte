<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { ws } from '../../data/ws-client'
  import { ACTIVE_SESSION, ACTIVE_SESSION_SUB } from './queries'
  import { sessionId, session } from '../session/data'
  import Loading from '../Loading.svelte'
  import PreclassBoard from './PreclassBoard.svelte'
  import Scoreboard from './Scoreboard.svelte'
  import ResultsBoard from './ResultsBoard.svelte'

  onMount(async () => {
    const response = await request(ACTIVE_SESSION)
    if (response.classSessions[0]) {
      sessionId.set(response.classSessions[0].id)
    }
    // subscribe to above
    const subscription = ws.request({ query: ACTIVE_SESSION_SUB })
      .subscribe({
        next (message) {
          if (!message.data || !message.data.classSessions) return
          sessionId.set(message.data.classSessions.node.id)
        }
      })
    return () => {
      subscription && subscription.unsubscribe()
    }
    // this is all basically identical to the controller's session data
    // reuse it here?
  })
</script>

<style>
  div {
    height: 100%;
    font-family: 'Schoolbell', cursive;
  }
</style>

<svelte:head>
  <title>Viewer</title>
  <link href="https://fonts.googleapis.com/css?family=Schoolbell" rel="stylesheet">
  <style>
    body {
      background: black;
    }
  </style>
</svelte:head>

<div>
  {#if !$sessionId}
    <h2 class="title">No active session found</h2>
  {:else if !$session}
    <Loading what="session"/>
  {:else if $session.stage === 'Active'}
    <PreclassBoard />
  {:else if $session.stage === 'Started'}
    <Scoreboard />
  {:else if $session.stage === 'Ended'}
    <ResultsBoard />
  {/if}
</div>