<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { BIRTHDAYS } from '../../data/queries'
  import { isValid } from 'date-fns'

  window.isValid = isValid
  let bdays

  onMount(async () => {
    const response = await request(BIRTHDAYS)
    bdays = response.students
    bdays = bdays.filter(student => student.daysToBirthday <= 7)
      .sort((a, b) => a.daysToBirthday - b.daysToBirthday)
  })
  $: console.log(bdays)
</script>

{#if bdays && bdays.length > 0}
  <h2 class="title is-4">Birthdays</h2>
  {#each bdays as bday (bday.id)}
    <li>{bday.englishName || bday.chineseName} - in {bday.daysToBirthday} days ({new Date(bday.birthdate).toDateString()})</li>
  {/each}
{/if}