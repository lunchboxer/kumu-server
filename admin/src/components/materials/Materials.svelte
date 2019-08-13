<script>
  import { onMount } from 'svelte'
  import { materials } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import MaterialsList from './MaterialsList.svelte'
  import CreateMaterial from './CreateMaterial.svelte'
  import FilterItems from '../FilterItems.svelte'

  let errors = ''

  onMount(async () => {
    try {
      await materials.get({})
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get materials from server.", type: 'danger' })
    }
  })
</script>
<svelte:head>
  <title>Materials</title>
</svelte:head>

<h1 class="title">Materials</h1>

<Error {errors} />

<CreateMaterial />

<FilterItems searchParams='title' store={materials} />

{#if $materials}
  <MaterialsList materials={$materials} />
{:else if !errors}
  <Loading what="materials"/>
{/if}