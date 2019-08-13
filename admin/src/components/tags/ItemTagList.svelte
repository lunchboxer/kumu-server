<script>
  import AddTagToItem from './AddTagToItem.svelte'
  import TagOnItem from './TagOnItem.svelte'

  export let item
  export let store
  export let type
</script>

<style>
  .tag-inputs {
    display: flex;
    flex-wrap: wrap;
  }
</style>

{#if item.tags && item.tags.length > 0}
  <div class="tags">
    {#each item.tags as tag (tag.id)}
      <TagOnItem {tag} itemId={item.id} {store} {type} />
    {/each}
  </div>
{/if}
  
<div class="tag-inputs">
  <AddTagToItem {item} {type} {store} />
</div>