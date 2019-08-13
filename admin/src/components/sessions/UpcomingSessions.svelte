<script>
  import { todaysSessions } from './data'
  import { time } from '../../data/timer'
  import Loading from '../Loading.svelte'
  import SessionListItem from './SessionListItem.svelte'
</script>

{#if $todaysSessions}
  {#if $todaysSessions.soon}
    <h3 class="title is-5">{$todaysSessions.soon.length} Lesson{$todaysSessions.soon.length-1 && 's' || ''} within 30 minutes</h3>
    {#each $todaysSessions.soon as session (session.id)}
      <SessionListItem {session} time={$time} />
    {/each}
  {/if}
   
  {#if $todaysSessions.later}
    <h3 class="title is-5">{$todaysSessions.later.length} Lesson{$todaysSessions.later.length-1 && 's' || ''} within 24 hours</h3>
    {#each $todaysSessions.later as session (session.id)}
      <SessionListItem {session} time={$time} />
    {/each}
  {/if}
{:else}
  <Loading what="today's lessons" />
{/if}