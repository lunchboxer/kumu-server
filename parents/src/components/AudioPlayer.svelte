<script>
  import { onMount } from 'svelte'

  export let audio
  let player
  let paused = true
  let time = 0
  let duration
  let progress = 0

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
</style>

<div class="audioplayer" class:disabled={isNaN(duration)}>
  <audio bind:currentTime={time} bind:duration bind:paused bind:this={player}>
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
  <a href={audio.url} download class="icon">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg></a> -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
  </a> 
</div>