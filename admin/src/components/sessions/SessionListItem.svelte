<script>
  import { formatDistance, format, formatRelative } from 'date-fns'
  import Modal from '../Modal.svelte'
  import DeleteSession from './DeleteSession.svelte'
  import EditSession from './EditSession.svelte'
  import IconButton from '../IconButton.svelte'

  export let session
  let showDelete = false
  let showEdit = false
  let showActions = false
  export let time = new Date()

  const relativeDate = (date, time) => {
    if (!date) return
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
  }

  const formatTime = (time) => {
    if (!time) return
    const dateTime = new Date(time)
    if (dateTime.getMinutes() === 0) {
      return format(dateTime, 'h b')
    }
    return format(dateTime, 'p')
  }

  const maybeDate = (date) => {
    const timeDiff = (new Date(date) - new Date())
    if (Math.abs(timeDiff) > 8.64e7) { // more than a day ago
      const dateString = formatRelative(new Date(date), new Date())
      return ['AM', 'PM'].includes(dateString.slice(-2))
        ? dateString
        : `${dateString} ${formatTime(date)}`
    }
    return ''
  }
  const isCurrentOrPast = (date) => {
    const now = new Date()
    const in30 = new Date(now.valueOf() + 30 * 6e+4)
    return (date < in30.toISOString())
  }
</script>
<style>
  li {
    list-style: none;
    margin: 0;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li:nth-child(even) {
    background: rgba(0, 0, 0, 0.3);
  }

  .buttons {
    display: flex;
    flex-wrap: nowrap;
  }

  @media only screen and (min-width: 600px) {
    li {
      padding: 1rem;
    }
  }
</style>

{#if session}
  <li>

    <p>
    {#if isCurrentOrPast(session.startsAt)}
      <a href="#/session/{session.id}">
        <span on:click={() => { showActions = !showActions }}>
          {session.group.name} class {relativeDate(session.startsAt, time)}, {maybeDate(session.startsAt) || formatTime(session.startsAt)} to {formatTime(session.endsAt)}
        </span>
      </a>
    {:else}
      <span on:click={() => { showActions = !showActions }}>
        {session.group.name} class {relativeDate(session.startsAt, time)}, {maybeDate(session.startsAt) || formatTime(session.startsAt)} to {formatTime(session.endsAt)}
      </span>
    {/if}
    
    {#if session.lesson && session.lesson.name}
      <br>
    <span>{session.lesson.name}&nbsp;<a href="#/lesson/{session.lesson.id}"><i class="fas fa-link"></i></a></span>
    {/if}
  </p>

    <div class="buttons">
      <IconButton on:click={ () => { showEdit = true }} name="edit" />
      <IconButton on:click={ () => { showDelete = true }} name="minus" />
    </div>

  </li>
{/if}

<Modal bind:open={showDelete}>
  {#if showDelete}
    <DeleteSession {session} bind:open={showDelete} />
  {/if}
</Modal>

<Modal bind:open={showEdit}>
  {#if showEdit}
    <EditSession {session} bind:open={showEdit} />
  {/if}
</Modal>