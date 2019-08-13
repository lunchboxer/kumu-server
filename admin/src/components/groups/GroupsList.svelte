<script>
  import { groups } from './data'
  import GroupsListItem from './GroupsListItem.svelte'
  import AddGroup from './AddGroup.svelte'

  $: sortedGroups = $groups.slice().sort((a, b) => {
    const date1 = a.semester.startDate
    const date2 = b.semester.startDate
    return (date1 > date2) - (date1 < date2)
  })
</script>

<style>
  .group-list {
    margin-top: 1rem;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  .groups-count {
    margin: 1rem 0;
  }
</style>

<p class='groups-count'>Showing {$groups && $groups.length} groups sorted by semester.</p>

<div class="details">
  <AddGroup />
</div>

{#if $groups && $groups.length}
<ul class="group-list">
  {#each sortedGroups as group (group.id)}
    <GroupsListItem {group} />
  {/each}
</ul>
{/if}