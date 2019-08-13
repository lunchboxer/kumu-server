<script>
  import { session } from '../session/data'
  import CreateReport from './CreateReport.svelte'
  import ReportDetails from './ReportDetails.svelte'
  import PublishReportButton from './PublishReportButton.svelte'
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<section class="report">
  <h3 class="title is-4">Report</h3>
  {#if !$session.lesson}
      <p>A lesson must be added before a report can be created.</p>
    {:else if $session && !$session.report}
      <p>No report exists for this session.</p>
      <CreateReport classSessionId={$session.id} />
    {:else}
      <PublishReportButton classSessionId={$session.id} />
      <!-- show the detials of the report here -->
      <ReportDetails report={$session.report} classSessionId={$session.id} />
    {/if}
</section>