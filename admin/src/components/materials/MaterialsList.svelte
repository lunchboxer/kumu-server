<script>
  export let materials
</script>

<style>
  section {
    margin: 0.5;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
  }

  .type {
    margin: 0 1rem;
  }
</style>

<section class="materials-list">
  {#if materials}
    <p>{materials.length} matching materials found:</p>
    {#each materials as material (material.id)}
      <li>
        <a href="#/material/{material.id}">{material.title}</a> <span class="type">{material.type}</span>
        {#if material.tags && material.tags.length > 0}
        <div class="tags">
          {#each material.tags as tag (tag.id)}
            <span class="tag is-dark">{tag.name}</span>
          {/each}
          </div>
        {/if}
        </li>
    {/each}
  {/if}
</section>