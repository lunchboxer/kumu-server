<script>
  import { onMount } from 'svelte'
  import marked from 'marked'
  import { formatRelative } from 'date-fns'
  import { title } from './Header.svelte'
  import { SESSION } from '../data/queries'
  import { request } from '../data/fetch-client'
  import MaterialList from './MaterialList.svelte'
  import WordList from './WordList.svelte'

  let session
  let errors = ''

  export let params = {}

  onMount(async () => {
    try {
      const response = await request(SESSION, { id: params.id })
      session = response.classSession
      title.set(`${session.group.name}班第${session.number}课`)
      errors = ''
    } catch (error) {
      errors = error
    }
  })

  const format = (date) => {
    if (!date) return
    return formatRelative(new Date(date), new Date())
  }
</script>

<a href="#/">&leftarrow;Back to lessons</a>

{#if errors}
  <p class="errors">{errors}</p>
{/if}

{#if session}
  {#if session.lesson}
    <h2>{session.lesson.name}</h2>
  {/if}
  
  {#if session.endedAt}
    <p>{format(session.endedAt)}</p>
  {/if}

  {#if session.report && session.report.published}

    {#if session.report.summaryZH}
      <h3>Summary</h3>
      {@html marked(session.report.summaryZH, { breaks: true })}
    {/if}

    {#if session.report.homeworkZH}
      <h3>Homework</h3>
      {@html marked(session.report.homeworkZH, { breaks: true })}
    {/if}

    {#if session.report.materials}
      <MaterialList materials={session.report.materials} />
    {/if}

    {#if session.report.words}
      <WordList words={session.report.words} />
    {/if}

  {:else}
    <p>No report is available yet.</p>
  {/if}
{:else if !errors}
  <p>Loading class session...</p>
{/if}