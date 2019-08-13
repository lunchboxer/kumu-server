<script>
  import { auth } from './data/auth'
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import Header from './components/Header.svelte'
  import Login from './components/Login.svelte'
</script>

<Header />

<main class="container">
  {#if $auth.token}
    <Router {routes} />
  {:else}
    <Login />
  {/if}
</main>