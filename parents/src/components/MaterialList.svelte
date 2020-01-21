<script>
  import MaterialAudioItem from './MaterialAudioItem.svelte'
  import marked from 'marked'

  export let materials

  const images = materials.filter(material => material.type.split('/')[0] === 'image')
  const audios = materials.filter(material => material.type.split('/')[0] === 'audio')
  const videos = materials.filter(material => material.type.split('/')[0] === 'video')
  const otherMaterials = materials.filter(material => !['image', 'audio', 'video']
    .includes(material.type.split('/')[0]))

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

  {#if otherMaterials.length > 0}
  <ul>
    {#each otherMaterials as material (material.id)}
    <li class="materialitem">
      <div class="itemtitle">
        <a href={material.url}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
          <span>{material.title}</span>
        </a>
      </div>
      {#if material.notes}
        <div class="notes">
          {@html marked(material.notes, { breaks: true })}
        </div>
      {/if}
    </li>
    {/each}
  </ul>
{/if}
{/if}