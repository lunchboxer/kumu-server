<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { notifications } from '../notifications'
  import { material, materials } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'
  import DeleteItem from '../DeleteItem.svelte'
  import EditMaterial from './EditMaterial.svelte'

  export let params = {}
  let errors = ''
  let showDelete = false

  onMount(async () => {
    if (!$material || $material.id !== params.id) {
      try {
        await material.get(params.id)
        if ($material === null) push(`/not-found/material/${params.id}`)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch material from the server', type: 'danger' })
      }
    }
  })

  const truncate = (string) => {
    if (string.length > 80) {
      return string.substring(0, 77) + '...'
    }
  }
</script>

<style>
  :global(.details p) {
    margin: 1rem 0 1rem;
    max-width: 700px;
  }

  .title.is-4 {
    margin-top: 1.5rem;
  }

  section {
    margin: 1rem;
  }
</style>

<svelte:head>
  <title>Material Details</title>
</svelte:head>

{#if errors}
  <Error {errors} />
{/if}

{#if $material && $material.id === params.id}
  <h1 class="title">{$material.title}</h1>

  <ItemTagList item={$material} type="materials" store={material} />

  <section class="details">
    <h2 class="title is-4">Material Details</h2>
    <p>URL: <a href={$material.url}>{truncate($material.url)}</a></p>
  </section>

  <section class="buttons">
    <EditMaterial material={$material} />
    <button class="button is-danger" on:click={() => { showDelete = true }}><i class="fas fa-trash"></i>Delete</button>
    <DeleteItem id={$material.id} store={materials} type="material" name={$material.title} bind:open={showDelete} />
  </section>

{:else if !errors}
  <Loading what="Material"/>
{/if}