<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import CurrentSession from './components/sessions/CurrentSession.svelte'
</script>

<style>
  main {
    height: calc(100% - 5rem);
    padding: 1rem;
    margin: 0;
  }
</style>

{#if $location !== '/viewer'}
<Navbar />
{/if}

<main>

  {#if $auth.username}
    {#if $location !== '/viewer'}
      <CurrentSession />
    {/if}
    <Router {routes} />
  {:else}
    <Login />
  {/if}
        
  </main>
  
  {#if location !== '/viewer'}
  <NotificationList/>
  {/if}