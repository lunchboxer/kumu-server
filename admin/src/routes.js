import NotFound from './components/NotFound.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import Semesters from './components/semesters/Semesters.svelte'
import Students from './components/students/Students.svelte'
import Groups from './components/groups/Groups.svelte'
import Sessions from './components/sessions/Sessions.svelte'
import Session from './components/session/Session.svelte'
import Lessons from './components/lessons/Lessons.svelte'
import Lesson from './components/lessons/Lesson.svelte'
import EditLesson from './components/lessons/EditLesson.svelte'
import CreateLesson from './components/lessons/CreateLesson.svelte'
import Materials from './components/materials/Materials.svelte'
import Material from './components/materials/Material.svelte'
import Words from './components/words/Words.svelte'
import Word from './components/words/Word.svelte'
import Tags from './components/tags/Tags.svelte'
import Profile from './components/profile/Profile.svelte'
import Viewer from './components/viewer/Viewer.svelte'

export default {
  '/': Dashboard,
  '/semesters': Semesters,
  '/students': Students,
  '/groups': Groups,
  '/sessions': Sessions,
  '/session/:id': Session,
  '/lessons': Lessons,
  '/lesson/:id': Lesson,
  '/edit-lesson/:id': EditLesson,
  '/new-lesson': CreateLesson,
  '/materials': Materials,
  '/material/:id': Material,
  '/words': Words,
  '/word/:id': Word,
  '/tags': Tags,
  '/me': Profile,
  '/viewer': Viewer,
  '/not-found/:item/:id?': NotFound,
  '*': NotFound
}
