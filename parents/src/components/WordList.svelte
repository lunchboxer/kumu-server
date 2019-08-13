<script>
  export let words
</script>

<h3>Words</h3>

{#if words}
  {#each words as word (word.id)}
    <li>{word.english} - {word.chinese}</li>
  {/each}
{/if}