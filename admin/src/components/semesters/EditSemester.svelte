<script>
  import { semesters } from './data'
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import SemesterForm from './SemesterForm.svelte'

  export let id
  export let open = false
  export let semester = {}
  export let name = ''
  export let startDate = ''
  export let endDate = ''
  let loading = false
  let errors = ''
  let defaultDate = null

  onMount(() => {
    defaultDate = startDate && endDate
      ? [startDate, endDate]
      : null
  })

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await semesters.patch(id, detail)
      notifications.add({ text: `Saved semester '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not update semester.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<SemesterForm on:reset={reset} on:submit={save} {name} {defaultDate} {errors} {loading} />