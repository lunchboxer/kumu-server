<script>
  import { points } from './data'
  import IconButton from '../IconButton.svelte'
  export let student
  export let sessionId

  const addPoint = (value) => {
    points.add(value, student.id, sessionId)
  }
  $: pointsTally = $points ? $points.reduce((sum, point) => {
    if (point.student.id !== student.id) return sum
    return sum + point.value
  }, 0) : 0
</script>

<style>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    max-width: 500px;
  }

  span.name {
    width: 10rem;
    border: red;
  }

  span.points {
    text-align: right;
  }
</style>

<li>
  <IconButton name="plus-square" color="#55FF66" on:click={() => addPoint(1)} />
    <span class="name">{student.englishName || student.chineseName}</span>
    <span class="points">{pointsTally}</span>
    <IconButton name="minus-square" color="#FF3344" disabled={pointsTally < 1} on:click={ () => addPoint(-1)}/>
</li>