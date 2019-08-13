import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_STUDENTS } from './queries'
import {
  CREATE_STUDENT,
  REMOVE_STUDENT_FROM_GROUP,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  MOVE_TO_DIFFERENT_GROUP,
  ADD_STUDENT_TO_GROUP
} from './mutations'

const createstudentstore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async (orderBy, searchString) => {
      const getres = await request(GET_STUDENTS, { orderBy, searchString })
      set(getres.students)
    },
    sort: (orderBy, direction) => {
      update(previous => {
        return previous.slice().sort((a, b) => {
          if (!a[orderBy]) return 1
          return a[orderBy].localeCompare(b[orderBy] || '') * direction
        })
      })
    },
    create: async (input, groupId) => {
      const response = await request(CREATE_STUDENT, { input, groupId })
      update(previous => previous && [...previous, response.createStudent])
    },
    remove: async id => {
      const response = await request(DELETE_STUDENT, { id })
      update(previous =>
        previous.filter(student => response.deleteStudent.id !== student.id)
      )
    },
    patch: async (id, input) => {
      const response = await request(UPDATE_STUDENT, { id, input })
      update(previous => previous.map((student) => {
        if (student.id !== id) return student
        return response.updateStudent
      }))
    },
    moveToDifferentGroup: async (studentId, oldGroupId, newGroupId) => {
      const response = await request(MOVE_TO_DIFFERENT_GROUP, { studentId, oldGroupId, newGroupId })
      update(previous => previous.map((student) => {
        if (student.id !== studentId) return student
        return response.moveStudentToDifferentGroup
      }))
    },
    addStudentToGroup: async (studentId, groupId) => {
      const response = await request(ADD_STUDENT_TO_GROUP, { studentId, groupId })
      update(previous => previous.map((student) => {
        if (student.id !== studentId) return student
        return response.addStudentToGroup
      }))
    },
    removeStudentFromGroup: async (studentId, groupId) => {
      const response = await request(REMOVE_STUDENT_FROM_GROUP, { studentId, groupId })
      update(previous => previous.map((student) => {
        if (student.id !== studentId) return student
        return response.removeStudentFromGroup
      }))
    }
  }
}

export const students = createstudentstore()
