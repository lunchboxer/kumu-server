<script>
  import { groups } from './data'
  import GroupsListItem from './GroupsListItem.svelte'
  import AddGroup from './AddGroup.svelte'
  import SemesterSelect from './SemesterSelect.svelte'

  let semesterId = ''

  $: filteredGroups = !semesterId ? $groups : $groups.filter(group => group.semester.id === semesterId)
  $: sortedGroups = filteredGroups.slice().sort((a, b) => {
    if (a.semester.startDate > b.semester.startDate) return -1
    if (a.semester.startDate < b.semester.startDate) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
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

<SemesterSelect bind:value={semesterId} />

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