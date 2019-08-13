<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { CURRENT_NEXT_SEMESTER_GROUPS } from '../../data/queries'
  import { notifications } from '../notifications'
  import { students } from './data'
  import Error from '../Error.svelte'

  let semesters
  let selectCurrent
  let currentSemester
  let nextSemester
  let selectNext
  let errors = ''
  let currentLoading = false
  let nextLoading = false
  let closeButton
  export let open
  export let student = {}

  onMount(() => {
    semesters = request(CURRENT_NEXT_SEMESTER_GROUPS)
  })
  $: loading = currentLoading || nextLoading

  const isInGroup = (id) => {
    return !!student.groups.find(g => g.id === id)
  }

  async function joinOrChangeGroup (select, semester) {
    select === selectCurrent ? currentLoading = true : nextLoading = true
    select.disabled = true
    closeButton.disabled = true
    // find out if student is alrady in a group of the same semester
    const selected = select.value
    const groupName = select.selectedOptions[0].text
    const sameSemester = semester.groups.find(group => isInGroup(group.id))
    let text = ''
    try {
      if (selected === '' && sameSemester) {
        await students.removeStudentFromGroup(student.id, sameSemester.id)
        text = `Removed ${student.englishName} from ${sameSemester.name} class`
      } else if (sameSemester) {
        await students.moveToDifferentGroup(student.id, sameSemester.id, selected)
        text = `Switched ${student.englishName} from ${sameSemester.name} class to ${groupName} class`
      } else {
        await students.addStudentToGroup(student.id, selected)
        text = `Added ${student.englishName} to ${groupName} class`
      }
      notifications.add({ text, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: `Unable to change ${student.englishName}'s classes`, type: 'danger' })
    } finally {
      select.disabled = false
      closeButton.disabled = false
      select === selectCurrent ? currentLoading = false : nextLoading = false
    }
  }
</script>

<style>
  .control {
    grid-column: selects;
  }

  .label {
    grid-column: labels;
    justify-self: end;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .grid-container {
    display: grid;
    align-items: center;
    grid-template-columns: [labels] auto [selects] auto;
    justify-content: start;
    grid-gap: 1rem 1rem;
    margin-bottom: 1rem;
  }
</style>

<h2 class="title">Change {student.englishName}'s classes</h2>
<Error {errors} />
<div class="grid-container">
  {#await semesters}
  Loading groups ...
{:then result}

  {#if result && result.currentSemester}
    <label class="label" >Current semester</label>
    <div class="control">
        <div class="select" class:is-loading={currentLoading}>
          <select bind:value={currentSemester} bind:this={selectCurrent} on:change={()=>joinOrChangeGroup(selectCurrent, result.currentSemester)}>
              <option value="">none</option>
              {#each result.currentSemester.groups as group}
                <option value={group.id} selected={isInGroup(group.id)}>{group.name}</option>
              {/each}
          </select>
        </div>
      </div>
  {/if}

  {#if result && result.nextSemester}
  <label class="label">{result.nextSemester.name}</label>
  <div class="control">
    <div class="select" class:is-loading={nextLoading}>
      <select bind:value={nextSemester} bind:this={selectNext} on:change={()=>joinOrChangeGroup(selectNext, result.nextSemester)}>
        <option value="">none</option>
        {#each result.nextSemester.groups as group}
          <option value={group.id} selected={isInGroup(group.id)}>{group.name}</option>
        {/each}
      </select>
    </div>
  </div>
  {/if}
  {:catch error}
    {error}
  {/await}
</div>

  <div class="buttons">
    <button 
      class="button is-primary" 
      class:is-loading={loading} 
      bind:this={closeButton} 
      on:click={() =>open = false}
      >
      Done
    </button>
  </div>