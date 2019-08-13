<script>
  import { onMount } from 'svelte'
  import { tags } from './data'
  import { notifications } from '../notifications'

  export let item
  export let store
  export let type = ''
  let newTag = ''
  let toAdd

  onMount(async () => {
    if (!$tags) {
      await tags.get()
    }
  })

  $: currentTags = item.tags.length > 0 ? item.tags.map(t => t.id) : []
  $: otherTags = ($tags && $tags.length > 0) ? $tags.filter(t => !currentTags.includes(t.id)) : []

  const add = async kind => {
    const input = {}
    if (kind === 'new') {
      if (!newTag) return
      input.tags = { create: { name: newTag } }
    } else {
      if (!toAdd) return
      input.tags = { connect: { id: toAdd } }
    }
    try {
      await store.patch({ input, id: item.id })
      notifications.add({ text: 'Added tag to item', type: 'success' })
      newTag = ''
      toAdd = ''
    } catch (error) {
      console.error(error)
      notifications.add({ text: "Couldn't add tag to item", type: 'danger' })
    }
  }
</script>

<style>
  .select {
    margin: 0 0.5rem 0.5rem 0;
  }

  .field {
    margin-bottom: 0.5rem;
  }

  input {
    width: 15rem;
  }

  .button {
    border-radius: 0 4px 4px 0;
  }
</style>

{#if otherTags}
<div class="select">
    <select bind:value={toAdd} on:change={add}>
      <option value="">Add existing tag</option>
      {#each otherTags as tag (tag.id)}
        <option value={tag.id}>{tag.name}</option>
        {/each}
    </select>
  </div>
{/if}

<div class="field has-addons">
  <div class="control new has-icons-left">
    <input class="input" type="text" bind:value={newTag} on:change={ () => add('new') } placeholder="new tag">
    <span class="icon is-small is-left">
      <i class="fas fa-tag"></i>
    </span>
  </div>
  <button class="button is-success" on:change={ () => add('new')}>add</button>
</div>