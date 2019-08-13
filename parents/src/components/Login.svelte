<script>
  import { onMount } from 'svelte'
  import { auth } from '../data/auth'
  import { request } from '../data/fetch-client'
  import { STUDENTS } from '../data/queries'

  let students = []
  let searchString = ''
  let selected = ''
  let password = ''
  let passwordConfirm = ''
  let passwordsMatch = true

  onMount(async () => {
    try {
      const response = await request(STUDENTS)
      students = response.students
    } catch (error) {
      console.error(error)
    }
  })

  const reload = async () => {
    const response = await request(STUDENTS, { searchString })
    students = response.students
  }

  const checkPasswords = () => {
    if (!passwordConfirm) return
    passwordsMatch = password === passwordConfirm
  }

  const register = async () => {
    checkPasswords()
    if (!password || !passwordConfirm || !passwordsMatch) return
    try {
      await auth.register(selected, password)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async () => {
    if (!password) return
    try {
      await auth.login(selected, password)
    } catch (error) {
      console.error(error)
    }
  }

  $: selectedStudent = students.find(s => s.id === selected)
</script>

<style>
  p.error {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    color: red;
  }
</style>

<div>
  <h2>Login</h2>

  <label>Search by student's name</label>
  <input type="text" bind:value={searchString} on:input={reload} />

  {#if students && students.length > 0}
    <p>{students.length} matching students</p>
    <select bind:value={selected}>
      <option>Select a student</option>
      {#each students as student (student.id)}
        <option value={student.id}>
          {student.englishName} 
          {#if student.chineseName}
            ({student.chineseName})
          {/if}
        </option>
      {/each}
    </select>
  {/if}
</div>

{#if selected}
  {#if !selectedStudent.lastLogin}
    <label>Create a password</label>
    <input type="password" bind:value={password} on:change={checkPasswords}>

    <label>Confirm password</label>
    {#if !passwordsMatch}
      <p class='error'>Passwords don't match.</p>
    {/if}
    <input type="password" bind:value={passwordConfirm} 
      on:change={checkPasswords}>
    

    <button on:click={register}>Register</button>
  {:else}
    <label>Password</label>
    <input type="password" bind:value={password} />

    <button on:click={login}>Log in</button>
  {/if}
{/if}