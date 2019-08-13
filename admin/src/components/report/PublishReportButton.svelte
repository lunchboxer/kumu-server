<script>
  import { sessions } from '../sessions/data'
  import { session } from '../session/data'
  import Error from '../Error.svelte'
  import { notifications } from '../notifications'

  let errors = ''
  let loading = false
  export let classSessionId

  const togglePublish = async (value) => {
    loading = true
    const verb = value ? 'publish' : 'unpublish'
    const input = { report: { update: { published: value } } }
    try {
      await sessions.patch(classSessionId, input)
      notifications.add({ text: `${verb.charAt(0).toUpperCase() + verb.slice(1)}ed session report`, type: 'success' })
      errors = ''
    } catch (error) {
      errors = error
      notifications.add({ text: `Couldn't ${verb} session report`, type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<Error {errors} />

{#if $session && $session.report.published}
  <button class="button is-primary" class:is-loading={loading} 
    on:click={() => togglePublish(false)}>
    <i class="fas fa-eye-slash"></i>
    Unpublish report
  </button>
  {:else if !$session.report.published}
  <button class="button is-primary" class:is-loading={loading} 
    on:click={() => togglePublish(true)}>
    <i class="fas fa-paper-plane"></i>
    Publish report
  </button>
{/if}