<script>
  import { onMount } from 'svelte'
  import { words } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import WordList from './WordList.svelte'
  import CreateWord from './CreateWord.svelte'
  import FilterItems from '../FilterItems.svelte'

  let errors = ''

  onMount(async () => {
    try {
      await words.get()
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get words from server.", type: 'danger' })
    }
  })
</script>
<svelte:head>
  <title>Words</title>
</svelte:head>

<h1 class="title">Words</h1>

<Error {errors} />

<CreateWord />

<FilterItems searchParams={['english', 'chinese']} store={words} />

{#if $words}
    <WordList words={$words} />
  {:else if !errors}
    <Loading what="words"/>
  {/if}