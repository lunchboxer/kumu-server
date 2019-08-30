<script>
  import { student } from './data/stores'
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import Header from './components/Header.svelte'
  import Login from './components/Login.svelte'

  $: if (!$student.attendances && $student.id) student.get($student.id)
</script>

<Header />

<main class="container">
  {#if $student && $student.id}
    <Router {routes} />
  {:else}
    <Login />
  {/if}
</main>