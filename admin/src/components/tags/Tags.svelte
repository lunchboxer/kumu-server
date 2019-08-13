<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import CreateTag from './CreateTag.svelte'
  import { tags } from './data'
  import Error from '../Error.svelte'
  import EditTag from './EditTag.svelte'
  import DeleteItem from '../DeleteItem.svelte'
  import Modal from '../Modal.svelte'

  let errors = ''
  let openTag
  let deleteTag

  onMount(async () => {
    try {
      await tags.get()
    } catch (error) {
      errors = error
      notifications.add({ text: "Coudn't load tags from server", type: 'danger' })
    }
  })
</script>

<style>
  .tag {
    cursor: pointer;
  }

  .tag-list {
    margin-top: 2rem;
  }
</style>

<svelte:head>
  <title>Tags</title>
</svelte:head>

<h1 class="title">Tags</h1>

<CreateTag />

<Error {errors} />

<div class="tag-list">
  {#if $tags && $tags.length > 0}
  <h2 class="title is-4">{$tags.length} tags. Click to edit.</h2>
  <div class="field is-grouped is-grouped-multiline">
    {#each $tags as tag (tag.id)}
    <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark" on:click={() => { openTag = tag }}>{tag.name}</span>
          {#if tag.connections === 0}
          <span class="tag is-delete" on:click={() => { deleteTag = tag }}></span>
          {:else}
          <span class="tag">{tag.connections}</span>
          {/if}
        </div>
      </div>
    {/each}
    </div>
  {/if}
</div>

<Modal bind:open={openTag}>
  {#if openTag}
    <EditTag bind:openTag />
  {/if}
</Modal>

{#if deleteTag}
<DeleteItem
  id={deleteTag.id} 
  store={tags} 
  type="tag" 
  name={deleteTag.name} 
  bind:open={deleteTag}
  next="/tags"
/>
{/if}