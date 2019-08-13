<script>
  export let title = 'Warning'
</script>

<style>
  .warning {
    max-width: 768px;
    border: 1px solid #ffdd57;
    color: #ffdd57;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

  .warning :global(strong) {
    color: inherit;
  }

  .warning-message-header {
    margin: 0;
    padding: 0.3rem 0.5rem;
    background: #ffdd57;
    color: black;
    font-size: 1.2rem;
  }

  .warning-message-header i {
    margin-right: 0.3rem;
  }

  .warning-message-body {
    padding: 0.3rem 0.6rem;
  }
</style>

<div class="warning">
  <p class="warning-message-header">
    <i class="fas fa-exclamation-triangle"></i>
    {title}
  </p>
  <section class="warning-message-body">
    <slot></slot>
  </section>
</div>