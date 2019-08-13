<script>
  import GroupForm from './GroupForm.svelte'
  import { groups } from './data'
  import { notifications } from '../notifications'

  export let open = false
  export let group
  let errors = ''
  let loading = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    const { id, semesterId, name } = detail
    loading = true
    try {
      await groups.patch(id, name, semesterId)
      notifications.add({ text: `Saved changes to '${name}' class`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could not save changes to group', type: 'danger' })
    } finally {
      loading = false
    }
  }

</script>

<GroupForm on:reset={reset} on:submit={save} id={group.id} {loading} {errors} name={group.name}
  semesterId={group.semester.id} />