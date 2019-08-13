<script>
  export let size = '8rem'
  export let group = false

  export let index = 0
  export let number = index + 1

  const hue = (index) => index * 30

</script>

<style>
  .star {
    width: var(--size);
    margin: 0.5rem;
    height: var(--size);
    fill: hsl(var(--hue), 100%, 50%);
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .group {
    width: calc(var(--size) * 1.5);
    height: calc(var(--size) * 1.5);
  }
</style>

<svg class="star" class:group xmlns="http://www.w3.org/2000/svg" style='--hue: {hue(index)}; --size: {size}'
  viewBox="0 0 32.218 32.218">
  <path
    d="M32.143 12.403c-.494-1.545-3.213-1.898-6.092-2.279-1.578-.207-3.371-.441-3.912-.842-.545-.398-1.305-2.035-1.977-3.482C18.94 3.169 17.783.687 16.165.683l-.03-.005c-1.604.027-2.773 2.479-4.016 5.082-.685 1.439-1.464 3.07-2.007 3.465-.549.391-2.342.611-3.925.803-2.876.35-5.599.678-6.107 2.215s1.479 3.426 3.585 5.422c1.156 1.098 2.465 2.342 2.671 2.982s-.143 2.416-.448 3.977c-.558 2.844-1.085 5.537.219 6.5.312.223.704.336 1.167.326 1.331-.021 3.246-1.057 5.097-2.061 1.387-.758 2.96-1.613 3.66-1.621.677 0 2.255.879 3.647 1.654 1.893 1.051 3.852 2.139 5.185 2.117.416-.006.771-.113 1.061-.322 1.312-.945.812-3.637.285-6.492-.29-1.564-.615-3.344-.41-3.984.212-.637 1.536-1.865 2.703-2.955 2.125-1.977 4.131-3.838 3.641-5.383z" />
  {#if number}
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="black" font-size="0.8rem">
    {number}
  </text>
  {/if}

</svg>