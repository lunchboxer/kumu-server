<script>
  import MaterialAudioItem from './MaterialAudioItem.svelte'
  import marked from 'marked'

  export let materials

  const images = materials.filter(material => material.type.split('/')[0] === 'image')
  const audios = materials.filter(material => material.type.split('/')[0] === 'audio')
  const videos = materials.filter(material => material.type.split('/')[0] === 'video')

  const thumbUrl = url => {
    const size = 150
    const params = `w_${size},h_${size},c_fit`
    const brokenuri = url.split('/')
    brokenuri.splice(6, 1, params)
    return brokenuri.join('/')
  }
</script>

<style>
  .materialitem {
    list-style: none;
  }

  .materialitem .icon {
    width: 3rem;
    margin-right: 0.5rem;
  }

  .materialitem .notes {
    padding-left: 3.5rem;
    font-size: 1.4rem;
  }

  .materialitem .itemtitle {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
</style>

<h3>材料</h3>

{#if materials}

  {#if images.length > 0 }
    <div class="thumbgallery">
      {#each images as image (image.id)}
        <div class="thumb">
          <a href={image.url}>
            <img src={thumbUrl(image.url)} alt={image.title}>
            <br>
            <span>{image.title}</span>
          </a>
        </div>
      {/each}
    </div>
  {/if}

  {#if audios.length > 0}
    <ul>
      {#each audios as audio (audio.id)}
        <MaterialAudioItem {audio}/>
      {/each}
    </ul>
  {/if}

  {#if videos.length > 0}
    <ul>
      {#each videos as video (video.id)}
        <li class="materialitem">
          <div class="itemtitle">
            <a href={video.url}>
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"/></svg>
              <span>{video.title}</span>
            </a>
          </div>
          {#if video.notes}
            <div class="notes">
              {@html marked(video.notes, { breaks: true })}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
{/if}