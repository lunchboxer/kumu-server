import NotFound from './components/NotFound.svelte'
import Home from './components/Home.svelte'
import ClassSession from './components/ClassSession.svelte'
import Logout from './components/Logout.svelte'

export default {
  '/': Home,
  '/session/:id': ClassSession,
  '/logout': Logout,
  '*': NotFound
}
