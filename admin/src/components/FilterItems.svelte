<script>
  let searchString = ''
  let loading = false
  let tagFilter = ''
  export let searchParams = 'name'
  export let store

  const getItems = async () => {
    const where = {}
    loading = true
    if (searchString) {
      where.OR = []
      if (typeof searchParams === 'string') {
        searchParams = [searchParams]
      }
      searchParams.forEach(param => {
        const whereItem = {}
        whereItem[param + '_contains'] = searchString
        where.OR.push(whereItem)
      })
      // where.OR = [{ english_contains: searchString }, { chinese_contains: searchString }]
    }
    if (tagFilter) {
      where.tags_some = { id: tagFilter }
    }
    try {
      await store.get({ where })
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  $: tags = $store && [...new Set($store.reduce((tags, item) => {
    return [...tags, ...item.tags]
  }, []))]
</script>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
  }

  .field {
    max-width: 15rem;
    margin-right: 0.5rem;
  }
</style>

<section class="filters">

  <div class="field">
    <div class="control search has-icons-left" class:is-loading={loading}>
      <input class="input" type="text" bind:value={searchString} on:input={getItems} placeholder="Search">
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>

  {#if tags}
    <div class="field">
      <div class="control has-icons-left">
        <div class="select">
          <select on:change={getItems} bind:value={tagFilter}>
            <option value="">No tag filter</option>
            {#each tags as tag (tag.id)}
              <option value={tag.id}>{tag.name}</option>
            {/each}
          </select>
        </div>
        <div class="icon is-small is-left">
          <i class="fas fa-tag"></i>
        </div>
      </div>
    </div>
  {/if}

</section>