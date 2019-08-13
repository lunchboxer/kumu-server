<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { lesson, lessons } from './data'
  import marked from 'marked'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import DeleteItem from '../DeleteItem.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'
  import AddMaterialToLesson from './AddMaterialToLesson.svelte'
  import AddWordToLesson from './AddWordToLesson.svelte'
  import RemoveMaterialButton from './RemoveMaterialButton.svelte'
  import RemoveWordButton from './RemoveWordButton.svelte'

  export let params = {}
  let errors = ''
  let showDelete = false

  onMount(async () => {
    if (!$lesson || $lesson.id !== params.id) {
      try {
        await lesson.get(params.id)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch lesson from the server', type: 'danger' })
      }
    }
  })
</script>

<style>
  .materials-list {
    margin-bottom: 1rem;
  }

  :global(.summaries p) {
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
  <title>Lesson Details</title>
</svelte:head>

{#if errors}
  <Error {errors} />
{/if}

{#if $lesson && $lesson.id === params.id}
  <h1 class="title">{$lesson.name}</h1>

  <ItemTagList item={$lesson} type="lessons" store={lesson} />

  <section class="summaries">
    <h2 class="title is-4">Lesson Summary</h2>
    <h3 class="subtitle">English</h3>
    {@html marked($lesson.summaryEN, { breaks: true })}
  
    <h2 class="title is-4">Homework</h2>
    <h3 class="subtitle">English</h3>
    {@html marked($lesson.homeworkEN, { breaks: true })}

    <h2 class="title is-4">Lesson Summary</h2>
    <h3 class="subtitle">Chinese</h3>
    {@html marked($lesson.summaryZH, { breaks: true })}
  
    <h2 class="title is-4">Homework</h2>
    <h3 class="subtitle">Chinese</h3>
    {@html marked($lesson.homeworkZH, { breaks: true })}
  </section>
  
  <section class="materials">
    <h2 class="title is-4">Materials</h2>
    {#if $lesson.materials && $lesson.materials.length > 0}
    <ul class="materials-list">
      {#each $lesson.materials as material (material.id)}
        <li>
          <a href="#/material/{material.id}">{material.title}</a>
           - {material.type} 
           <RemoveMaterialButton materialId={material.id} /> 
        </li>
      {/each}
    </ul>
    {/if}
    <AddMaterialToLesson lesson={$lesson} />
  </section>

  <section class="words">
    <h2 class="title is-4">Words</h2>
    {#if $lesson.words && $lesson.words.length > 0}
    <ul class="words-list">
      {#each $lesson.words as word (word.id)}
      <li>
        <a href="#/word/{word.id}">{word.english} ({word.chinese})</a>
        <RemoveWordButton wordId={word.id} />
      </li> 
      {/each}
    </ul>
    {/if}
    <AddWordToLesson />
  </section>

  <section class="actions">
    <h2 class="title is-4">Lesson actions</h2>
    <div class="buttons">
    <a class="button is-primary" href="#/edit-lesson/{$lesson.id}"><i class="fas fa-edit"></i>Edit</a>
    <button class="button is-danger" on:click={() => { showDelete = true }}><i class="fas fa-trash"></i>Delete</button>
    <DeleteItem id={$lesson.id} store={lessons} type="lesson" name={$lesson.title} bind:open={showDelete} />
  </div>
  </section>

{:else if !errors}
  <Loading what="Lesson"/>
{/if}