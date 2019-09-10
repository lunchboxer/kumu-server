<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { UNTRANSLATED } from './queries'

  let lessons

  onMount(async () => {
    const response = await request(UNTRANSLATED)
    lessons = response.lessons
  })
</script>

{#if lessons && lessons.length > 0}
    
    <section>
      <h2 class="title is-4">Untranslated lessons</h2>
      {#each lessons as lesson (lesson.id)}
        <li><a href="#/lesson/{lesson.id}">
          {lesson.name}
        </a></li>
      {/each}
    </section>
     
    {/if}