<script>
  import { onMount } from 'svelte'
  import marked from 'marked'
  import { formatRelative } from 'date-fns'
  import { zhCN } from 'date-fns/locale'
  import { title } from './Header.svelte'
  import MaterialList from './MaterialList.svelte'
  import WordList from './WordList.svelte'

  let session
  let errors = ''

  export let params = {}

  onMount(async () => {
    try {
      const response = await fetch(`data/session-${params.id}.json`)
      session = response && await response.json()
      title.set(`${session.group.name}班第${session.number}课`)
      errors = ''
    } catch (error) {
      errors = error
    }
  })

  const format = (date) => {
    if (!date) return
    return formatRelative(new Date(date), new Date(), { locale: zhCN })
  }
</script>

<p><a href="#/">&leftarrow;回到全学期课程</a></p>

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
      <h3>课程内容</h3>
      {@html marked(session.report.summaryZH, { breaks: true })}
    {/if}

    {#if session.report.homeworkZH}
      <h3>家庭作业</h3>
      {@html marked(session.report.homeworkZH, { breaks: true })}
    {/if}

    {#if session.report.words}
      <WordList words={session.report.words} />
    {/if}

    {#if session.report.materials}
      <MaterialList materials={session.report.materials} />
    {/if}

  {:else}
    <p>No report is available yet.</p>
  {/if}
{:else if !errors}
  <p>Loading class session...</p>
{/if}