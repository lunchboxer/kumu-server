import { writable, readable, derived } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { ws } from '../../data/ws-client'
import {
  CLASS_SESSION,
  CLASS_SESSION_SUB,
  ATTENDANCE_SUB,
  GET_SESSION_STUDENTS,
  POINTS_SUB,
  GET_SESSION_POINTS,
  SESSION_RESULTS
} from './queries'
import { UNDO_POINT, ADD_POINT } from './mutations'

// have it reset itself to null when not in use
export const sessionId = writable(null, set => set(null))

export const session = readable(null, set => {
  let subscription
  const unsubscribe = sessionId.subscribe(id => {
    if (!id) {
      set(null)
      return
    }
    if (subscription) {
      subscription.unsubscribe()
    }
    request(CLASS_SESSION, { id })
      .then(response => {
        set(response.classSession)
      })
    subscription = ws.request({ query: CLASS_SESSION_SUB, variables: { id } })
      .subscribe({
        next (message) {
          if (message.data && message.data.classSession) {
            set(message.data.classSession)
          }
        }
      })
  })
  return () => {
    subscription && subscription.unsubscribe()
    unsubscribe()
  }
})

const createSessionStudentStore = () => {
  const mapAttendanceToStudents = (attendances, students) => {
    if (attendances && attendances.length === 0) return students
    attendances = Array.isArray(attendances) ? attendances : [attendances]
    return students.map(student => {
      const attendance = attendances.find(a => {
        if (!a.student) return false
        return a.student.id === student.id
      })
      if (attendance) {
        student.attendance = attendance
      }
      return student
    })
  }
  const { subscribe, update } = writable(null, set => {
    let subscription
    const unsubscribe = session.subscribe(session => {
      if (!session) return
      if (subscription) {
        subscription.unsubscribe()
      }
      // get initial data
      request(GET_SESSION_STUDENTS, { groupId: session.group.id, classSessionId: session.id })
        .then(response => {
          set(mapAttendanceToStudents(response.attendances, response.students))
        })
      // and subscribe to changes
      subscription = ws.request({ query: ATTENDANCE_SUB, variables: { classSessionId: session.id } })
        .subscribe({
          next (message) {
            if (message.data && message.data.attendances) {
              update(previous => {
                return mapAttendanceToStudents(message.data.attendances, previous)
              })
            }
          }
        })
    })
    return () => {
      subscription && subscription.unsubscribe()
      unsubscribe()
    }
  })
  return {
    subscribe, update, mapAttendanceToStudents
  }
}
export const sessionStudents = createSessionStudentStore()

const createPointsLogStore = () => {
  const { subscribe, update } = writable([])
  return {
    subscribe,
    update,
    add: (point) => {
      update(previous => [point, ...previous.slice(0, 9)])
    },
    remove: (id) => {
      update(previous => previous.filter(point => point.id !== id))
    }
  }
}
export const pointsLog = createPointsLogStore()

const createPointsStore = () => {
  const { subscribe, update } = writable(null, set => {
    let subscription
    const unsubscribe = session.subscribe(session => {
      if (!session) return
      if (subscription) {
        subscription.unsubscribe()
      }
      // get initial values
      request(GET_SESSION_POINTS, { classSessionId: session.id })
        .then(response => {
          set(response.points)
        })
      // and subscribe to changes from the server
      subscription = ws.request({ query: POINTS_SUB, variables: { classSessionId: session.id } })
        .subscribe({
          next (message) {
            if (message.data && message.data.points) {
              const { node, mutation, previousValues } = message.data.points
              if (mutation === 'CREATED') {
                update(previous => {
                  return [node, ...previous]
                })
              }
              if (mutation === 'DELETED') {
                update(previous => {
                  return previous.filter(point => point.id !== previousValues.id)
                })
                pointsLog.update(previous => {
                  return previous.filter(point => point.id !== previousValues.id)
                })
              }
            }
          }
        })
    })
    return () => {
      unsubscribe()
      subscription && subscription.unsubscribe()
    }
  })
  return {
    subscribe,
    update,
    undo: async (id) => {
      await request(UNDO_POINT, { id })
    },
    add: async (value, studentId, classSessionId) => {
      const response = await request(ADD_POINT, { value, studentId, classSessionId })
      pointsLog.add(response.addPoint)
    }
  }
}

export const points = createPointsStore()

export const results = derived(sessionId, async ($sessionId, set) => {
  if (!$sessionId) return
  const response = await request(SESSION_RESULTS, { classSessionId: $sessionId })
  if (!response.classSession) return
  const { attendances, points } = response.classSession
  const withPoints = attendances && attendances.map(attendance => {
    attendance.points = points && points.filter(point => {
      return point.student.id === attendance.student.id
    })
    attendance.pointsTally = attendance.points.reduce((sum, point) => {
      return sum + point.value
    }, 0)
    return attendance
  })
  set(withPoints.slice().sort((a, b) => {
    return b.pointsTally - a.pointsTally
  }))
})

export const getResults = async (id) => {
  const response = await request(SESSION_RESULTS, { id })
  if (!response.classSession) return
  const { attendances, points } = response.classSession
  const withPoints = attendances && attendances.map(attendance => {
    attendance.points = points && points.filter(point => {
      return point.student.id === attendance.student.id
    })
    attendance.pointsTally = attendance.points.reduce((sum, point) => {
      return sum + point.value
    }, 0)
    return attendance
  })
  return withPoints.slice().sort((a, b) => {
    return b.pointsTally - a.pointsTally
  })
}
