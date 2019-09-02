import { writable } from 'svelte/store'

const createStudentStore = () => {
  const myStudent = window.localStorage.getItem('myStudent')
  const initial = myStudent ? JSON.parse(myStudent) : null
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    get: async (id) => {
      const response = await fetch(`data/student-${id}.json`)
      const result = response && await response.json()
      set(result)
    },
    login: async (selected) => {
      window.localStorage.setItem('myStudent', JSON.stringify(selected))
      set(selected)
    },
    logout: () => {
      window.localStorage.removeItem('myStudent')
      set()
    }
  }
}

export const student = createStudentStore()
