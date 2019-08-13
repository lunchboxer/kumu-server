<script>
  import MaterialListItem from './MaterialListItem.svelte'
  export let materials
</script>

<h3>Materials</h3>

{#if materials}
  {#each materials as material (material.id)}
    <MaterialListItem {material} />
  {/each}
{/if}