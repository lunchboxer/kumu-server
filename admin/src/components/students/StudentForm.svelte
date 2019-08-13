<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'
  import GroupSelect from '../GroupSelect.svelte'

  const dispatch = createEventDispatcher()

  export let chineseName = ''
  export let pinyinName = ''
  export let englishName = ''
  export let birthdate = null
  export let groupId = null
  export let id = null
  export let loading = false
  export let errors
  export let groups = []
  export let gender = null
  let form
  let saveButton

  const todaysDate = new Date().toISOString().slice(0, 10)
  $: if (saveButton) { saveButton.disabled = loading }

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, chineseName, birthdate, englishName, pinyinName, gender, groupId })
  }
</script>

<style>
  .genders {
    margin: 1rem 0 0.5rem;
  }

  .buttons {
    margin-top: 1rem;
  }
</style>

<h2 class="title">{#if id}Edit{:else}Add{/if} a student</h2>

  <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
    {#if errors}
    <Error {errors}/>
    {/if}
    <Input bind:value={chineseName} label="Chinese name" placeholder="孙悟空" />
    <Input bind:value={pinyinName} label="Pinyin name" placeholder="Sūn Wùkōng" />
    <Input bind:value={englishName} label="English name" placeholder="Monkey King" />
    <Input type="date" bind:value={birthdate} label="Birthdate" max={todaysDate} />
    
    <div class="control genders">
			<label class="radio">
				<input type='radio' bind:group={gender} value='M'>
				Male
			</label>

			<label class="radio">
				<input type='radio' bind:group={gender} value='F'>
				Female
      </label>
    </div>
    {#if !id}
    <GroupSelect bind:groupId />
    {/if}
    <div class="buttons">
      <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={saveButton}>Save student</button>
      <input type="reset" class="button" value="Cancel">
    </div>
  </form>