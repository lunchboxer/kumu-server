<script>
  import { formatDistance } from 'date-fns'
  import { location } from 'svelte-spa-router'
  import { todaysSessions } from './data'
  import Warning from '../Warning.svelte'
  import DL from '../DL.svelte'

  const dateString = (date) => {
    const dateTime = new Date(date)
    return formatDistance(dateTime, new Date(), { addSuffix: true })
  }
</script>

<style>
  div.warning {
    display: flex;
    justify-content: space-between;
  }

  div.warning a {
    align-self: flex-end;
  }
</style>

{#if $todaysSessions && $todaysSessions.now && $todaysSessions.now.stage !== 'Ended'}
{#if $location !== `/session/${$todaysSessions.now.id}`}
  <Warning title="{$todaysSessions.now.group.name} class is on right now!">
    <div class="warning">
      <DL>
        <dt>Started:</dt>
        <dd>{dateString($todaysSessions.now.startsAt)}</dd>
        <dt>Ends:</dt>
        <dd>{dateString($todaysSessions.now.endsAt)}</dd>
        <dt>Status:</dt>
        <dd>{$todaysSessions.now.stage}</dd>
      </DL>
      <a href="#/session/{$todaysSessions.now.id}" class="button is-link"><i class="fas fa-running"></i>&nbsp; Go now</a>
    </div>
  </Warning>
  {/if}
  {/if}