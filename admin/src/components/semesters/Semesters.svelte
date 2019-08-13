<script>
  import { onMount } from 'svelte'
  import { semesters } from './data'
  import { notifications } from '../notifications'
  import SemesterList from './SemesterList.svelte'
  import AddSemester from './AddSemester.svelte'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'

  let errors = ''
  onMount(async () => {
    try {
      await semesters.get()
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get semesters from server.", type: 'danger' })
    }
  })
</script>

<svelte:head>
  <title>Semesters</title>
</svelte:head>

<h1 class="title">Semesters</h1>

<Error {errors} />

{#if $semesters}
<AddSemester/>
<SemesterList/>
{:else if !errors}
<Loading what="semesters"/>
{/if}