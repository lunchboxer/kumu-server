<script>
  import { request } from '../../data/fetch-client'
  import { CREATE_REPORT } from './mutations'

  export let classSessionId

  const create = async () => {
    // create a report from lesson
    await request(CREATE_REPORT, { classSessionId })
  }
</script>

<style>
  .button {
    margin: 1rem;
  }
</style>

<button class="button" on:click={create}>Create report</button>