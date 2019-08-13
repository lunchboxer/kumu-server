import { writable } from 'svelte/store'
import { STUDENT } from './queries'
import { request } from './fetch-client'

const createStudentStore = () => {
  const { subscribe, set } = writable()

  return {
    subscribe,
    get: async (id) => {
      const response = await request(STUDENT, { id })
      set({ ...response.student, attendances: response.attendances })
    }
  }
}

export const student = createStudentStore()
