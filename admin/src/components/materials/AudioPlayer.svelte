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
    return () => player.removEventListener('ended', playended)
  })

  const pad = number => number < 10 ? '0' + number : number

  const format = time => {
    if (isNaN(time)) return '--:--.-'
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
  }

  .range {
    -webkit-appearance: none;
    height: 1rem;
    width: 180px;
    background: white;
    cursor: pointer;
    margin: 1rem;
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

  .playpause {
    padding: 0.5rem;
    cursor: pointer;
  }

  .time {
    vertical-align: middle;
  }
</style>

<div class="audioplayer">
  <audio bind:currentTime={time} bind:duration bind:paused bind:this={player}>
    <source type={audio.type} src={audio.url}>
  </audio>
  <i on:click={ () => { paused = !paused }}
    class:fa-play={paused}
    class:fa-pause={!paused}
    class="fas playpause">
  </i>&nbsp;
  <span class='time elapsed'>{format(time)}</span>/<span class='time duration'>{format(duration)}</span>
  <input class="range" type="range" id="seek" max=100 min=0 value={progress * 100} on:input={seek} />
</div>