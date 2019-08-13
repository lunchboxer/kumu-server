<script>
  import { onMount } from 'svelte'
  import { me } from './data'
  import Loading from '../Loading.svelte'
  import DL from '../DL.svelte'

  onMount(async () => {
    me.get()
  })
</script>

<h1 class="title">User Profile</h1>

{#if $me}
<DL>
  <dt>Username:</dt>
  <dd>{$me.username}</dd>

  <dt>ID:</dt>
  <dd>{$me.id}</dd>
</DL>
  {:else}
  <Loading what="user" />
{/if}