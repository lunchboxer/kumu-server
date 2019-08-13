<script>
  import { onMount } from 'svelte'
  import { groups } from './data'
  import GroupsList from './GroupsList.svelte'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'

  let errors

  onMount(() => {
    groups.get()
  })
</script>

<svelte:head>
  <title>Groups</title>
</svelte:head>

<h1 class="title">Groups</h1>

{#if $groups}
  <GroupsList />
{:else if !errors}
  <Loading what="groups"/>
{:else}
  <Error {errors} />
{/if}