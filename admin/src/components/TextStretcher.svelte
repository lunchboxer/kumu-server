<script>
  let span
  export let text = 'this is stretchy'
  export let padding = 5
  let fontSize = 14
  export let minSize = 14
  export let maxSize = 512

  $: if (span) {
    const availableWidth = span.parentNode.clientWidth
    const currentWidth = span.scrollWidth
    fontSize = Math.min(
      Math.max(
        minSize,
        ((availableWidth - fontSize * 2) / currentWidth) * fontSize),
      maxSize
    )
  }
</script>

<style>
  .wrapper {
    display: flex;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: nowrap;
  }
</style>

<div class="wrapper">
  <p bind:this={span} style="font-size:{fontSize}px">
    {text}
  </p>
</div>