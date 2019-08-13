<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { notifications } from '../notifications'
  import { word, words } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'
  import EditWord from './EditWord.svelte'
  import DeleteItem from '../DeleteItem.svelte'

  export let params = {}
  let errors = ''
  let showDelete = false

  onMount(async () => {
    if (!$word || $word.id !== params.id) {
      try {
        await word.get(params.id)
        if ($word === null) push(`/not-found/material/${params.id}`)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch word from the server', type: 'danger' })
      }
    }
  })
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<svelte:head>
  <title>Word Details</title>
</svelte:head>

{#if errors}
    <Error {errors} />
  {/if}
  
  {#if $word && $word.id === params.id}
    <h1 class="title">{$word.english}</h1>
  
    <ItemTagList type="words" item={$word} store={words} />
  
    <section class="details">
      <h2 class="title is-4">Details</h2>
        <p><strong>Chinese</strong>: {$word.chinese}</p>
        <p><strong>Audio</strong>: {$word.audio || 'none'}</p>
      <h2 class="title is-4">Used in {$word.lessons.length} Lessons</h2>
      {#if $word.lessons && $word.lessons.length > 0}
        {#each $word.lessons as lesson (lesson.id)}
          <li><a href="#/lesson/{lesson.id}">{lesson.name}</a></li>
        {/each}
      {/if}
    </section>
  
    <section class="buttons">
      <EditWord word={$word} />
      <button class="button is-danger" on:click={() => { showDelete = true }}><i class="fas fa-trash"></i>Delete</button>
      <DeleteItem id={$word.id} store={words} type="word" name={$word.english} bind:open={showDelete} />
    </section>

  {:else if !errors}
    <Loading what="word"/>
  {/if}