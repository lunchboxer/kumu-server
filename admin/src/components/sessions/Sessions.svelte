<script>
  import { onMount } from 'svelte'
  import { sessions, sessionsFilter } from './data'
  import Upcoming from './UpcomingSessions.svelte'
  import SessionsList from './SessionsList.svelte'
  import AddSession from './AddSession.svelte'

  let activeComponent = Upcoming
  let active = 'upcoming'

  onMount(() => {
    sessions.get()
    const refetch = setInterval(sessions.get, 5 * 6e+4)
    return () => { refetch && clearInterval(refetch) }
  })

  const switchTab = (tab) => {
    let where = null
    active = tab
    if (tab === 'past') {
      where = { endsAt_lt: new Date().toISOString() }
    } else if (tab === 'future') {
      where = { startsAt_gt: new Date().toISOString() }
    }
    sessionsFilter.set(where)
    sessions.get()
    activeComponent = tab === 'upcoming' ? Upcoming : SessionsList
  }
</script>

<style>
  nav .button.is-outlined:hover {
    color: white;
    background: inherit;
  }
</style>

<svelte:head>
  <title>Class schedule</title>
</svelte:head>

<h1 class="title">
  Class schedule
</h1>

<AddSession />

<button class="button" on:click={sessions.get}><i class="fas fa-sync"></i></button>

<nav class="buttons has-addons is-centered">
  <button class="button is-link" class:is-outlined={active!=='upcoming' } on:click={()=>
    switchTab('upcoming')}>
    24 hours
  </button>
  <button class="button is-link" class:is-outlined={active!=='past' } on:click={()=> switchTab('past')
    }>
    Past
  </button>
  <button class="button is-link" class:is-outlined={active!=='future' } on:click={()=>
    switchTab('future')}>Future</button>
  <button class="button is-link" class:is-outlined={active!=='all' } on:click={()=> switchTab('all')}>All</button>
</nav>

<svelte:component this={activeComponent} />