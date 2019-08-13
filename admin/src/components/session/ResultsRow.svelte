<script>
  export let result = {}

  const pointsTally = ('0' + result.pointsTally).slice(-2)
</script>

<style>
  .absent,
  .status {
    color: #bbb;
  }
</style>

<li class:absent={result.status==="Absent" }>
  {#if result.status !== "Absent"}
  <span class="stars"><i class="fas fa-star"></i>&times;{pointsTally}</span>
  {/if}

  <span class="name">{result.student.englishName || result.student.chineseName}</span>

  <span class="status">
    {#if result.status !== "Present"}
      {result.status}
    {/if}
  </span>
</li>