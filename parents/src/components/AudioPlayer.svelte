<script>
  import { onMount } from 'svelte'

  export let audio
  let player
  let paused = true
  let time = 0
  let duration
  let progress = 0
  let loop = false

  onMount(() => {
    const playended = player.addEventListener('ended', () => { time = 0 })
    return () => player.removeEventListener('ended', playended)
  })

  const pad = number => number < 10 ? '0' + number : number

  const format = time => {
    if (isNaN(time)) return 'loading'
    var minutes = Math.floor(time / 60)
    var seconds = (time % 60).toFixed()
    return minutes + ':' + pad(seconds)
  }

  $: progress = duration ? time / duration : 0

  const seek = event => {
    paused = true
    const p = event.target.value
    time = p / 100 * duration
  }
  const toggleLoop = () => { loop = !loop }
</script>

<style>
  .audioplayer {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .audioplayer.disabled {
    color: grey;
  }

  .range {
    -webkit-appearance: none;
    height: 1rem;
    width: 100%;
    background: var(--base-color);
    cursor: pointer;
    margin: 1.5rem;
  }

  .disabled .range {
    background: lightgrey;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    background: grey;
    cursor: pointer;
    border-radius: 0;
  }

  /* All the same stuff for Firefox */
  input[type=range]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    background: grey;
    cursor: pointer;
    border-radius: 0;
  }

  /* All the same stuff for IE */
  input[type=range]::-ms-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    background: grey;
    cursor: pointer;
    border-radius: 0;
  }

  .icon {
    display: inline-flex;
    cursor: pointer;
    vertical-align: bottom;
  }

  .disabled svg {
    fill: grey;
  }

  .time {
    vertical-align: middle;
  }
  .loop.icon {
    margin-right: 1rem;
  }
</style>

<div class="audioplayer" class:disabled={isNaN(duration)}>
  <audio bind:currentTime={time} bind:duration bind:paused bind:this={player} loop={loop}>
    <source type={audio.type} src={audio.url}>
  </audio>
  <span on:click={() => { paused = !paused }} class="icon">
    {#if paused}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    {/if}
  </span>&nbsp;
  <span class='time elapsed'>{format(time)}</span>/<span class='time duration'>{format(duration)}</span>
  <input class="range" type="range" id="seek" max=100 min=0 value={progress * 100} on:input={seek} />
  <span class="loop icon" on:click={toggleLoop}>
    {#if loop}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M10 6.35V4.26c-.8.21-1.55.54-2.23.96l1.46 1.46c.25-.12.5-.24.77-.33zm-7.14-.94l2.36 2.36C4.45 8.99 4 10.44 4 12c0 2.21.91 4.2 2.36 5.64L4 20h6v-6l-2.24 2.24C6.68 15.15 6 13.66 6 12c0-1 .25-1.94.68-2.77l8.08 8.08c-.25.13-.5.25-.77.34v2.09c.8-.21 1.55-.54 2.23-.96l2.36 2.36 1.27-1.27L4.14 4.14 2.86 5.41zM20 4h-6v6l2.24-2.24C17.32 8.85 18 10.34 18 12c0 1-.25 1.94-.68 2.77l1.46 1.46C19.55 15.01 20 13.56 20 12c0-2.21-.91-4.2-2.36-5.64L20 4z"/></svg>
    {/if}
  </span>
  <a href={audio.url} download class="icon">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg></a> -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
  </a>
</div>