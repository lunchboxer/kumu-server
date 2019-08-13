<script>
  import { location } from 'svelte-spa-router'
  export let url = ''
  export let text = ''
  export let icon = null
</script>
<style>
  i {
    margin-right: 0.3rem;
    width: 20px;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    a.is-active {
      border-radius: 4px;
      color: #cb2d6f;
      font-weight: bold;
      background-color: inherit;
    }
  }
</style>

<a class="navbar-item" class:is-active={$location === url} href='#{url}'>
  {#if icon}
    <i class="fas fa-{icon}"></i>
  {/if}
  {text} 
</a>