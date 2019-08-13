import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_SEMESTERS } from './queries'
import { DELETE_SEMESTER, CREATE_SEMESTER, UPDATE_SEMESTER } from './mutations'

const createSemesterStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const response = await request(GET_SEMESTERS)
      set(response.semesters)
    },
    remove: async id => {
      const response = await request(DELETE_SEMESTER, { id })
      update(previous =>
        previous.filter(semester => response.deleteSemester.id !== semester.id)
      )
    },
    create: async (input) => {
      const response = await request(CREATE_SEMESTER, { input })
      update(previous => [...previous, response.createSemester])
    },
    patch: async (id, input) => {
      const response = await request(UPDATE_SEMESTER, { id, input })
      update(previous => previous.map((semester) => {
        if (semester.id !== id) return semester
        return response.updateSemester
      }))
    }
  }
}

export const semesters = createSemesterStore()
