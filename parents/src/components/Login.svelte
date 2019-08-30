<script>
  import { student } from '../data/stores'
  import students from '../../public/data/students.json'

  let searchString = ''
  let selected = ''

  $: filteredStudents = students.filter(s => {
    if (searchString === '') return true
    return (
      s.englishName.includes(searchString) ||
      s.chineseName.includes(searchString)
    )
  })

  const enter = () => {
    student.login(selectedStudent)
  }

  $: selectedStudent = students.find(s => s.id === selected)
</script>

<div>
  <h2>Login</h2>

  <label>Search by student's name</label>
  <input type="text" bind:value="{searchString}" />

  {#if students && students.length > 0}
  <p>{filteredStudents.length} matching students</p>
  <select bind:value="{selected}">
    <option>Select a student</option>
    {#each filteredStudents as student (student.id)}
    <option value="{student.id}">
      {student.englishName} {#if student.chineseName} ({student.chineseName})
      {/if}
    </option>
    {/each}
  </select>
  <button disabled="{!selected}" on:click="{enter}">Enter</button>
  {/if}
</div>
