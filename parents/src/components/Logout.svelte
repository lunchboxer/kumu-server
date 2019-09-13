<script>
  import { student } from '../data/stores'
  import { push } from 'svelte-spa-router'

  student.logout()
  push('/')
</script>