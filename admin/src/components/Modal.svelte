<script>
  import { fade, fly } from 'svelte/transition'

  export let open = false

  const close = () => { open = false }
</script>

<style>
  .modal-content {
    background: black;
    display: flex;
    justify-content: center;
    border-radius: 4px;
  }

  .modal-content section {
    padding: 2rem;
  }
</style>

{#if open}
  <div class="modal is-active">
    <div class="modal-background" on:click={close} transition:fade|local="{{ duration: 200 }}"></div>
    <div class="modal-content is-clipped" in:fly="{{ duration: 200, y: -300 }}" out:fly="{{ duration: 200, y: 300 }}">
      <section class="section">
       <slot></slot>
      </section>
    </div>
  </div>
  {/if}