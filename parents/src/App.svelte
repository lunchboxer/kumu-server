<script>
  import { student } from './data/stores'
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import Header from './components/Header.svelte'
  import Login from './components/Login.svelte'

  $: if ($student && !$student.attendances && $student.id) student.get($student.id)
</script>

<style>
  main {
    padding: 3rem 2rem;
  }

  @media only screen and (min-width: 768px) {
    main {
      width: 80%;
      margin: auto;
    }
  }
</style>

<Header />

<main class="container">
  {#if $student && $student.id}
    <Router {routes} />
  {:else}
    <Login />
  {/if}
</main>