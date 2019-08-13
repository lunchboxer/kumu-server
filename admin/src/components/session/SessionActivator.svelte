<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { ACTIVATE_SESSION } from './mutations'

  export let id = null
  onMount(() => {
    if (!id) return
    request(ACTIVATE_SESSION, { id })
  })
</script>

<p>Activating class session...</p>