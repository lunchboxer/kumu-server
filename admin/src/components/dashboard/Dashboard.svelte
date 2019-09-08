<script>
  import Birthdays from './Birthdays.svelte'
  import IncompleteSessionsList from './IncompleteSessionsList.svelte'
  import UnpublishedReports from './UnpublishedReports.svelte'
  import UntranslatedLessons from './UntranslatedLessons.svelte'
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>

<Birthdays />

<IncompleteSessionsList />

<UnpublishedReports />

<UntranslatedLessons />