import NotFound from './components/NotFound.svelte'
import Home from './components/Home.svelte'
import ClassSession from './components/ClassSession.svelte'

export default {
  '/': Home,
  '/session/:id': ClassSession,
  '*': NotFound
}
