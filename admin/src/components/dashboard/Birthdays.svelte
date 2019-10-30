<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { BIRTHDAYS } from './queries'

  let bdays

  onMount(async () => {
    const response = await request(BIRTHDAYS)
    bdays = response.students
    console.log(response.students)
    bdays = bdays.filter(student => student.daysToBirthday <= 7)
      .sort((a, b) => a.daysToBirthday - b.daysToBirthday)

 })
</script>

{#if bdays && bdays.length > 0}
  <h2 class="title is-4">Birthdays</h2>
  {#each bdays as bday (bday.id)}
    <li>{bday.englishName || bday.chineseName} - 
      {#if bday.daysToBirthday === 0}
        Today!
      {:else if bday.daysToBirthday === 1}
        Tomorrow
      {:else}
        in {bday.daysToBirthday} days
      {/if} 
      ({new Date(bday.birthdate).toDateString()})</li>
  {/each}
{/if}