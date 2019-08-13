<script>
  import { session, sessionId } from './data'
  import { onDestroy } from 'svelte'
  import Loading from '../Loading.svelte'
  import NotFound from '../NotFound.svelte'
  import ActiveSession from './ActiveSession.svelte'
  import SessionActivator from './SessionActivator.svelte'
  import StartedSession from './StartedSession.svelte'
  import EndedSession from './EndedSession.svelte'

  export let params = {}

  sessionId.set(params.id)

  onDestroy(() => {
    sessionId.set(null)
  })
</script>

{#if $session}
  <h2 class="title">{$session.group.name} class lesson {$session.number}</h2>
  {#if $session.stage === 'Inactive'}
    <SessionActivator id={params.id} />
  {:else if $session.stage === 'Active'}
    <ActiveSession />
  {:else if $session.stage === 'Started'}
    <StartedSession />
  {:else if $session.stage === 'Ended'}
    <EndedSession id={params.id} />
  {/if}
  

{:else if $session && $session.classSession === null}
  <NotFound />
{:else}
  <Loading what="class session"/>
{/if}