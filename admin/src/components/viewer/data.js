import { writable } from 'svelte/store'
import { session } from '../session/data'
import { GET_SESSION_POINTS } from '../session/queries'
import { request } from '../../data/fetch-client'

export const activeSession = writable()

const createPointsStore = () => {
  const { subscribe, update } = writable(null, set => {
    const unsubscribe = session.subscribe(session => {
      if (!session) return
      request(GET_SESSION_POINTS, { classSessionId: session.id })
        .then(response => {
          set(response.points)
        })
    })
    return () => unsubscribe()
  })
  return {
    subscribe,
    update
  }
}

export const points = createPointsStore()
