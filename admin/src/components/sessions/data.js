import { writable, get, readable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_SESSIONS, SESSIONS_SUB, GET_TODAYS_SESSIONS } from './queries'
import { CREATE_SESSION, DELETE_SESSION, UPDATE_SESSION } from './mutations'
import { ws } from '../../data/ws-client'

export const semester = writable()

const createSessionsStore = () => {
  const { subscribe, set, update } = writable()
  return {
    subscribe,
    update,
    get: async () => {
      const where = (get(sessionsFilter))
      const response = await request(GET_SESSIONS, { where })
      set(response.classSessions)
    },
    create: async (input, groupId, lessonId) => {
      const response = await request(CREATE_SESSION, { input, groupId, lessonId })
      sessions.get()
      return response.createClassSession
    },
    remove: async (id) => {
      const response = await request(DELETE_SESSION, { id })
      sessions.get()
      return response.deleteClassSession
    },
    patch: async (id, input, groupId, lessonId) => {
      const response = await request(UPDATE_SESSION, { id, input, groupId, lessonId })
      sessions.get()
      return response.updateClassSession
    }
  }
}

export const sessionsFilter = writable()

export const sessions = createSessionsStore()

const sortSessions = (sessions) => {
  if (!sessions) return
  const time = new Date()
  const in15Min = new Date(time.getTime() + 30 * 6e+4).toISOString()
  const in24hrs = new Date(time.getTime() + 24 * 3.6e+6).toISOString()
  const now = sessions.find(session => {
    return session.startsAt < time.toISOString() && session.endsAt > time.toISOString()
  })
  const soon = sessions.filter(session => {
    return session.startsAt > time.toISOString() && session.startsAt < in15Min
  })
  const later = sessions.filter(session => {
    return session.startsAt > in15Min && session.startsAt < in24hrs
  })
  return { now, soon, later }
}

const fetchTodaysSessions = async () => {
  const now = new Date()
  const latest = new Date(now.getTime() + 24 * 3.6e+6)
  const response = await request(GET_TODAYS_SESSIONS, { now, latest })
  return response.classSessions
}

// get the initial sessions list from today
// then resort that list every 15 seconds
// listen to a subscription on all sessions
// the new or the old value was within 24 hours, refetch.
// also automatically refetch if data is stale

export const todaysSessions = readable(null, set => {
  // get the initial data
  const updatedAt = new Date()
  let sessions = []
  fetchTodaysSessions().then(result => {
    sessions = result
    set({ ...sortSessions(result), updatedAt })
  })
  const subscription = ws.request({ query: SESSIONS_SUB }).subscribe({
    next (message) {
      if (message.data && message.data.classSessions) {
        fetchTodaysSessions().then(result => {
          sessions = result
          set({ ...sortSessions(result), updatedAt: new Date() })
        })
      }
    }
  })
  const interval = setInterval(() => {
    // refetch data periodically
    const now = new Date()
    const expiry = new Date(now - 3.6e+6)
    if (updatedAt < expiry) {
      fetchTodaysSessions().then(result => {
        sessions = result
        const updatedAt = new Date()
        set({ ...sortSessions(sessions), updatedAt })
      })
    } else {
      set({ ...sortSessions(sessions), updatedAt })
    }
  }, 15000)

  return () => {
    subscription && subscription.unsubscribe()
    clearInterval(interval)
  }
})
