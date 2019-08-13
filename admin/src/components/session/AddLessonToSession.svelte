<script>
  import { notifications } from '../notifications'
  import { sessionId } from './data'
  import { request } from '../../data/fetch-client'
  import { ADD_LESSON_TO_SESSION } from './mutations'
  import LessonSelect from '../sessions/LessonSelect.svelte'

  let lessonId
  export let id

  const add = async () => {
    if (!lessonId) return
    const result = await request(ADD_LESSON_TO_SESSION, { id, lessonId })
  }

  $: added = add(lessonId)
</script>

<LessonSelect bind:lessonId />