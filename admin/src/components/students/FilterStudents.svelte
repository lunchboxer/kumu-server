<script>
  import { students } from './data'

  let sortParam = 'id'
  let direction = 1
  let searchString = ''

  const reload = () => {
    const directionString = direction === 1 ? 'ASC' : 'DESC'
    students.get(`${sortParam}_${directionString}`, searchString)
  }
  const sort = () => {
    if (!sortParam) return
    students.sort(sortParam, direction)
  }
  const reverse = () => {
    direction = -(direction)
    sort()
  }
</script>

<style>
  .control {
    margin: 0.5rem;
  }
</style>

<div class="control search has-icons-left">
  <input class="input" type="text" bind:value={searchString} on:input={reload} placeholder="Search">
  <span class="icon is-small is-left">
    <i class="fas fa-search"></i>
  </span>
</div>

<div class="control">
  <div class="select">
    <select bind:value={sortParam} on:change={sort}>
      <option value="id">Sort by: ID</option>
      <option value="pinyinName">Chinese name</option>
      <option value="englishName">English name</option>
      <option value="birthdate">Age</option>
      <option value="gender">Gender</option>
    </select>
  </div>

  <button class="button is-link" on:click={reverse}><i class="fas fa-sort-{direction === -1 ? 'up' : 'down'}"></i>
  </button>
</div>