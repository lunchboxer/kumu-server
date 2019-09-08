<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { UNPUBLISHED } from './queries'

  let sessions

  onMount(async () => {
    const response = await request(UNPUBLISHED)
    sessions = response.classSessions
  })
</script>

{#if sessions && sessions.length > 0}
  
  <section>
    <h2 class="title is-4">Unpublished session reports</h2>
    {#each sessions as session (session.id)}
      <li><a href="#/session/{session.id}">
        {session.group.name} lesson {session.number}
      </a></li>
    {/each}
  </section>
   
  {/if}