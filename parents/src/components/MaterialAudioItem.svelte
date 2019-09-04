<script>
  import marked from 'marked'
  import AudioPlayer from './AudioPlayer.svelte'

  export let audio
  let expanded = false
</script>

<style>
  li {
    list-style: none;
  }

  .itemtitle {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  .notes {
    align-self: flex-start;
    padding-top: 1rem;
  }

  .expanded {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .expand {
    margin-left: 1rem;
    display: inline-flex;
    vertical-align: bottom;
  }

  img {
    border: 1px solid lightgray;
    margin: 0;
  }
</style>

<li class="materialitem">
  <div class="itemtitle" on:click={() => { expanded = !expanded }}>
    <span>{audio.title}</span>
    <span class="expand">
      {#if expanded}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      {/if}
    </span>
  </div>
  {#if expanded}
    <div class="expanded">
      <AudioPlayer {audio} />
      {#if audio.imageUrl}
        <img src={audio.imageUrl} alt={audio.title}>
      {/if}
      {#if audio.notes}
        <div class="notes">
          {@html marked(audio.notes, { breaks: true })}
        </div>
      {/if}
    </div>
  {/if}
</li>