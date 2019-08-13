<script>
  import { formatDistance, format, formatRelative } from 'date-fns'
  import Modal from '../Modal.svelte'
  import DeleteSession from './DeleteSession.svelte'
  import EditSession from './EditSession.svelte'

  export let session
  let showDelete = false
  let showEdit = false
  let showActions = false

  const relativeDate = (date) => {
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
  {#if isCurrentOrPast(session.startsAt)}
  <a href="#/session/{session.id}">
    <span on:click={() => { showActions = !showActions }}>
    {session.group.name} class {relativeDate(session.startsAt)}, {maybeDate(session.startsAt) || formatTime(session.startsAt)} to {formatTime(session.endsAt)}
  </span>
</a>
{:else}
<span on:click={() => { showActions = !showActions }}>
    {session.group.name} class {relativeDate(session.startsAt)}, {maybeDate(session.startsAt) || formatTime(session.startsAt)} to {formatTime(session.endsAt)}
  </span>
{/if}

  <div class="buttons">
    <button class="button is-small" on:click={() => showEdit = true}><i class="fas fa-edit"></button>
    <button class="button is-small" on:click={() => showDelete = true}><i class="fas fa-minus"></button>
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