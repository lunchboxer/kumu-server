<script>
  import { fly, fade } from 'svelte/transition'
  import { points } from './data'
  import Star from './Star.svelte'
  export let student
  export let sessionId
  export let glow = false

  $: pointsTally = $points ? $points.reduce((sum, point) => {
    if (point.student.id !== student.id) return sum
    return sum + point.value
  }, 0) : 0
</script>

<style>
  li {
    position: relative;
    width: 100%;
  }

  .content {
    display: flex;
    position: relative;
    align-items: center;
    flex-wrap: wrap;
    background: transparent;
    z-index: 10;
    width: auto;
  }

  div.bg {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8rem;
    z-index: 1;
    transition: all 1s ease-out;
    background: white;
    border-radius: 10px;
  }

  div.bg.glow {
    opacity: 0.1;
  }

  .name {
    font-size: 4rem;
    margin: 1rem;
    width: 15rem;
  }

  @keyframes grow {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .name.glow {
    -webkit-animation-name: grow;
    animation-name: grow;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  .absent {
    color: rgba(140, 140, 140, 0.5);
  }
</style>

<li>
  <div class="content">
    <span class="name" class:glow class:absent={!student.attendance || student.attendance.status==="Absent" }>
      {student.englishName || student.chineseName}
    </span>
    {#if student.attendance && student.attendance.status !== "Absent"}
          {#each {length: pointsTally} as point, i}
            <div in:fly="{{x:-400}}" out:fade >
              <Star index={i} size="5rem" />
            </div>
          {/each}
        {/if}
  </div>
  <div class="bg" class:glow></div>
</li>