<script>
  import { lessons } from './data'
</script>

<style>
  section {
    margin: 0.5rem;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
  }

  .tags {
    margin-left: 0.5rem;
  }
</style>

<section class="lesson-list">
  {#if $lessons}
    <p>{$lessons.length} matching lessons found:</p>
    {#if $lessons.length > 0}
      {#each $lessons as lesson (lesson.id)}
        <li><a href="#/lesson/{lesson.id}">{lesson.name}</a>
        {#if lesson.tags.length > 0}
        <div class="tags">
            {#each lesson.tags as tag (tag.id)}
            <span class="tag is-dark">{tag.name}</span>
          {/each}
        </div>
          
        {/if}
        </li>
      {/each}
    {/if}
  {/if}
</section>