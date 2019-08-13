<script>
  import { location, pop } from 'svelte-spa-router'

  export let params = {}
</script>

<h1>404</h1>
<h2>resource not found</h2>

{#if params.item}
  <p>The <strong>{params.item}</strong> {params.id ? `'${params.id}'` : ''} could not be found.</p>
{:else }
  <p>The path '{$location}' leads nowhere</p>
{/if}
    
<p>It might be wise to return to the <a href="#/">main page</a>.</p>
<button on:click={pop}><i class="fas fa-backward"></i>&nbsp;go back</button>
 