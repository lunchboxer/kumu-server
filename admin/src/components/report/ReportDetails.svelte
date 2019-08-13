<script>
  import EditableTextarea from './EditableTextarea.svelte'
  import RemoveWordButton from './RemoveWordButton.svelte'
  import AddWordToReport from './AddWordToReport.svelte'
  import RemoveMaterialButton from './RemoveMaterialButton.svelte'
  import AddMaterialToReport from './AddMaterialToReport.svelte'

  export let report
  export let classSessionId
</script>

<style>
  .title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  section {
    padding-bottom: 1rem;
    max-width: 700px;
  }
</style>


<section>
  <h3 class="title is-5">Summary (English)</h3>
  <EditableTextarea text={report.summaryEN} key='summaryEN' />
</section>

<section>
  <h3 class="title is-5">Homework (English)</h3>
  <EditableTextarea text={report.homeworkEN} key='homeworkEN' />
</section>

<section>
  <h3 class="title is-5">Summary (Chinese)</h3>
  <EditableTextarea text={report.summaryZH} key='summaryZH' />
</section>

<section>
  <h3 class="title is-5">Homework (Chinese)</h3>
  <EditableTextarea text={report.homeworkZH} key='homeworkZH' />
</section>

<section>
  <h3 class="title is-5">Performance</h3>
  <EditableTextarea text={report.performance} key='performance' />
</section>

<section>
  <h3 class="title is-5">Vocabulary</h3>
  {#if report.words && report.words.length > 0}
    <ul class="words-list">
      {#each report.words as word (word.id)}
      <li>
        <a href="#/word/{word.id}">{word.english} ({word.chinese})</a>
        <RemoveWordButton wordId={word.id} {classSessionId} />
      </li> 
      {/each}
    </ul>
    {/if}
    <AddWordToReport />
</section>

<section>
  <h3 class="title is-5">Materials</h3>
  {#if report.materials && report.materials.length > 0}
  <ul class="materials-list">
    {#each report.materials as material (material.id)}
      <li>
        <a href="#/material/{material.id}">{material.title}</a>
         - {material.type} 
         <RemoveMaterialButton materialId={material.id} {classSessionId} /> 
      </li>
    {/each}
  </ul>
  {/if}
  <AddMaterialToReport />
</section>