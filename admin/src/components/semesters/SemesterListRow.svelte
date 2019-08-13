<script>
  import { semesters } from './data'
  import DeleteItem from '../DeleteItem.svelte'
  import EditSemester from './EditSemester.svelte'
  import Modal from '../Modal.svelte'

  let confirmDelete = false
  let showEdit = false
  export let semester = {}

  $: startDate = (new Date(semester.startDate)).toDateString()
  $: endDate = (new Date(semester.endDate)).toDateString()

  const showDeleteDialog = () => { confirmDelete = true }
</script>

<style>
  li {
    list-style: none;
    border-radius: 4px;
  }

  li:hover {
    background: rgba(0, 0, 0, 0.8);
    padding: 0 10px;
    margin: 0 -10px;
  }

  .firstrow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 0;
    width: 100%;
  }

  .name {
    margin-right: 0.6rem;
    font-weight: bold;
  }

  .date {
    white-space: pre;
    font-size: 80%;
    color: #ccc;
  }

  .buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    flex-direction: row-reverse;
    width: 8rem;
    justify-content: space-between;
  }

  i.butt {
    padding: 0.5rem;
    cursor: pointer;
    border: none;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    margin-bottom: 8px;
  }

  i.butt:hover {
    background: #cb2d6f;
  }
</style>

<li>
  <div class="firstrow">
    <div class="info">
      <span class="name">{semester.name}</span>
      <span class="date">{startDate} to {endDate}</span>
    </div>
    <div class="buttons">
      <i class="fas fa-minus-circle butt" on:click={showDeleteDialog}></i>
      <i class="fas fa-pencil-alt butt" on:click={ () => { showEdit = true }}></i>
    </div>
  </div>

  <div class="action">

    <DeleteItem id={semester.id} store={semesters} type="semester" name={semester.name} bind:open={confirmDelete} />

    <Modal bind:open={showEdit}>
      {#if showEdit}
        <EditSemester {...semester} bind:open={showEdit}></EditSemester>
      {/if}
    </Modal>
  </div>
</li>