<script>
  export let words = []
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

<section class="word-list">
  {#if words.length > 0}
    <p>{words.length} words found:</p>
    {#each words as word (word.id)}
      <li><a href="#/word/{word.id}">{word.english} ({word.chinese})</a>
        {#if word.tags && word.tags.length > 0}
        <div class="tags">
          {#each word.tags as tag (tag.id)}
            <span class="tag is-dark">{tag.name}</span>
          {/each}
          </div>
        {/if}
      </li>
    {/each}
  {/if}
</section>