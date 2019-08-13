<script>
  import { sessions } from './data'
  import { time } from '../../data/timer'
  import Loading from '../Loading.svelte'
  import SessionListItem from './SessionListItem.svelte'
</script>

{#if $sessions}
<h3 class="title is-5">Showing {$sessions.length} sessions</h3>
<p>Click a session to view details.</p>
<ul>
  {#each $sessions as session (session.id)}
  <SessionListItem {session} />
{/each}
</ul>

{:else}
  <Loading what="sessions"/>
{/if}