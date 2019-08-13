<script>
  import { notifications } from './data'

  export let id
  export let message

  $: text = !message || typeof message === 'string' ? message : message.text
  $: type = !message || typeof message === 'string' ? 'info' : message.type

  const remove = () => notifications.remove(id)
</script>


<div class="notification is-{type}">
  <button class="delete" on:click={remove}></button>
  {text}
</div>

<style>
  .notification {
    margin-bottom: 0.5rem;
  }
</style>