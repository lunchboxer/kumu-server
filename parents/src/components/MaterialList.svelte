<script>
  import MaterialListItem from './MaterialListItem.svelte'
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
  $: console.log(audios)
</script>

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
        <li class="materialitem">
          <div class="itemtitle">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/></svg>
            <a href={audio.url}>
              <span>{audio.title}</span>
            </a>
          </div>
          {#if audio.notes}
            <div class="notes">
              {@html marked(audio.notes, { breaks: true })}
            </div>
          {/if}
        </li>
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