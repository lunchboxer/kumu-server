<script>
  import { students } from './data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import StudentForm from './StudentForm.svelte'

  let open = false
  let errors = null
  let loading = false

  const reset = () => {
    errors = null
    open = false
  }

  const save = async ({ detail }) => {
    const { groupId, id, ...input } = detail
    loading = true
    try {
      await students.create(input, groupId)
      notifications.add({ text: `Created new student: '${detail.englishName}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could not save new student', 'type': 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  button {
    margin: 0.5rem;
  }
</style>

<button class="button is-primary" on:click={()=> open = true}>
  <i class="fas fa-plus"></i>&nbsp;Add Student
</button>

<Modal bind:open>
  <StudentForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>