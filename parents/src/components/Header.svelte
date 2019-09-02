<script context="module">
  import { writable } from 'svelte/store'

  export const title = writable('')
</script>

<header>
  <h1>果园英语 {$title}</h1>
</header>