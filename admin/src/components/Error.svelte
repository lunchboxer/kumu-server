<script>
  export let errors = ''

  const getMessage = (errors) => {
    if (!errors) return false
    return (Array.isArray(errors))
      ? errors.map(error => error.message).join('\n')
      : !errors.message ? errors : errors.message
  }
</script>

<style>
  .error {
    background: #220000;
    border-left: 2px solid #ff5555;
    color: #ff5555;
    padding: 0.3rem 0.6rem;
    margin-bottom: 1rem;
  }

  .error strong {
    color: inherit;
  }

  .error-message i {
    margin-right: 0.3rem;
  }
</style>

{#if getMessage(errors)}
<p class="error">
    <span class="error-message"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong>&nbsp;{getMessage(errors)}</span>
</p>
{/if}