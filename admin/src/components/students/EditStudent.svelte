<script>
  import { students } from './data'
  import { notifications } from '../notifications'
  import StudentForm from './StudentForm.svelte'

  export let open = false
  let errors = null
  let loading = false
  export let student

  const reset = () => {
    errors = null
    open = false
  }

  const save = async ({ detail }) => {
    const { id, groupId, ...input } = detail
    loading = true
    try {
      await students.patch(id, input)
      notifications.add({ text: `Saved changes to student: '${detail.englishName}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could not save changes to student', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<StudentForm on:reset={reset} on:submit={save} {errors} {loading} {...student} birthdate={student.birthdate &&
  student.birthdate.slice(0,10)} />