<script context="module">
  import { writable } from 'svelte/store'

  export const title = writable('果园英语')
</script>

<header>
  <h1>{$title}</h1>
</header>