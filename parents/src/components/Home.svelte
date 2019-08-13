<script>
  import { onMount } from 'svelte'
  import { auth } from '../data/auth'
  import { student } from '../data/stores'
  import ClassSessionList from './ClassSessionList.svelte'
  import { title } from './Header.svelte'

  let errors = ''

  onMount(async () => {
    try {
      await student.get($auth.id)
      // then
    } catch (error) {
      errors = error
    }
  })

  title.set('果园英语')
</script>

<h2>{$auth.englishName}'s lessons</h2>

{#if errors}
  <p class="errors">{errors}</p>
{/if}

{#if $student}
  {#if $student.attendances}
    <ClassSessionList attendances={$student.attendances} />
  {/if}
{:else if !errors}
  <p>Loading student data...</p>
{/if}