import { AllSessionFields } from './fragments'

export const ACTIVATE_SESSION = /* GraphQL */`
 mutation activateSession($id:ID!){
   activateSession(id:$id) {
     id
   }
 }`

export const START_CLASS = /* GraphQL */`
mutation startClass($id: ID!, $now: DateTime!) {
  updateClassSession(id: $id, input: {stage: Started, startedAt: $now}) {
    id
  }
  markRestAbsent(classSessionId: $id)
}
`

export const END_CLASS = /* GraphQL */`
mutation endClass($id: ID!, $now: DateTime!) {
  updateClassSession(id: $id, input: {stage: Ended, endedAt: $now}) {
    id
  }
}`

export const UPDATE_ATTENDANCE = /* GraphQL */`
mutation updateAttendance($classSessionId: ID!, $studentId: ID!, $status: String!){
  updateAttendance(classSessionId: $classSessionId, studentId: $studentId, status: $status){
    id
  }
}
`

export const MARK_ALL_PRESENT = /* GraphQL */`
mutation markAllPresent($classSessionId: ID!) {
  markAllPresent(classSessionId: $classSessionId)
}
`

export const UNDO_POINT = /* GraphQL */`
mutation undoPoint($id: ID!) {
  undoPoint(id: $id) {
    id
  }
}
`

export const ADD_POINT = /* GraphQL */`
mutation addPoint($value: Int!, $studentId: ID!, $classSessionId: ID!) {
  addPoint(value: $value, studentId: $studentId, classSessionId: $classSessionId) {
    id
    value
    student {
      englishName
      chineseName
      id
    }
  }
} `

export const CREATE_REPORT = /* GraphQL */ `
 mutation CreateReport($classSessionId: ID!, $input: ReportCreateInput) {
   createReport(classSessionId: $classSessionId, input: $input) {
     ...AllSessionFields
   }
 }
 ${AllSessionFields}`

export const ADD_LESSON_TO_SESSION = /* GraphQL */ `
mutation AddLessonToSession($id: ID!, $lessonId: ID!) {
  addLessonToClassSession(id: $id, lessonId: $lessonId) {
    ...AllSessionFields
  }
}
${AllSessionFields}`
