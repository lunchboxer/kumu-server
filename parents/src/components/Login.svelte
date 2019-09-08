<script>
  import { student } from '../data/stores'
  import students from '../../public/data/students.json'

  let searchString = ''
  let selected = ''

  $: filteredStudents = students.filter(s => {
    if (searchString === '') return false
    return (
      (s.englishName && s.englishName.toUpperCase() === searchString.toUpperCase()) ||
      s.chineseName === searchString
    )
  })

  const enter = () => {
    if (filteredStudents.length === 1) {
      student.login(filteredStudents[0])
    } else {
      student.login(selectedStudent)
    }
  }

  $: selectedStudent = students.find(s => s.id === selected)
</script>

<div>
  <h2>登录</h2>

  <label>输入学生姓名</label>
  <input type="text" bind:value="{searchString}" />

  {#if filteredStudents.length > 1}
    <select bind:value="{selected}">
      <option>请选一个学生</option>
      {#each filteredStudents as student (student.id)}
      <option value="{student.id}">
        {student.englishName} {#if student.chineseName} ({student.chineseName})
        {/if}
      </option>
      {/each}
    </select>
  {/if}

  {#if filteredStudents.length === 1 || selected}
    <button on:click="{enter}">进入</button>
  {/if}
</div>