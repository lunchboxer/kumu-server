<script>
  import { onMount } from 'svelte'
  import { students } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import StudentList from './StudentList.svelte'

  let errors

  onMount(async () => {
    try {
      await students.get()
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get students from server.", type: 'danger' })
    }
  })
</script>

<svelte:head>
  <title>Students</title>
</svelte:head>

<h1 class="title">Students</h1>

{#if $students}
  <StudentList />
{:else if !errors}
  <Loading what="students"/>
{:else}
  <Error {errors} />
{/if}