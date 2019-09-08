<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { INCOMPLETE_SESSIONS } from './queries'

  let sessions

  onMount(async () => {
    const response = await request(INCOMPLETE_SESSIONS)
    sessions = response.classSessions
  })
</script>

{#if sessions && sessions.length > 0}

<section>
  <h2 class="title is-4">Class Sessions with no report</h2>
  {#each sessions as session (session.id)}
    <li><a href="#/session/{session.id}">
      {session.group.name} lesson {session.number}
    </a></li>
  {/each}
</section>
 
{/if}