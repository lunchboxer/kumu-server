import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_LESSONS, LESSON } from './queries'
import { CREATE_LESSON, UPDATE_LESSON, DELETE_LESSON } from './mutations'

const createLessonsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async (options = {}) => {
      const { orderBy, where } = options
      const response = await request(GET_LESSONS, { orderBy, where })
      set(response.lessons)
    },
    remove: async id => {
      await request(DELETE_LESSON, { id })
      update(previous => previous && previous.filter(lesson => lesson.id !== id))
    },
    create: async (input) => {
      const response = await request(CREATE_LESSON, { input })
      update(previous => !previous ? [response.createLesson] : [...previous, response.createLesson])
    },
    patch: async ({ input, id }) => {
      const response = await request(UPDATE_LESSON, { id, input })
      update(previous => !previous ? [response.updateLesson] : previous.map((lesson) => {
        if (lesson.id !== id) return lesson
        return response.updateLesson
      }))
      lesson.update(previous => {
        if (previous && previous.id === id) {
          return response.updateLesson
        }
        return previous
      })
    }
  }
}

export const lessons = createLessonsStore()

const createLessonStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    patch: lessons.patch,
    get: async (id) => {
      const response = await request(LESSON, { id })
      set(response.lesson)
    }
  }
}

export const lesson = createLessonStore()
