import { AllSessionFields } from './fragments'

export const CLASS_SESSION = /* GraphQL */`
  query classSession($id: ID!){
    classSession (id: $id){
      ...AllSessionFields
    }
  }
  ${AllSessionFields}`

export const CLASS_SESSION_SUB = /* GraphQL */`
subscription classSession($id: ID!){
  classSession (id: $id){
    ...AllSessionFields
  }
}
${AllSessionFields}`

export const GET_SESSION_STUDENTS = /* GraphQL */`
query students($groupId: ID!, $classSessionId: ID!){
  students (where: { groups_some: {id: $groupId}}) {
    id
    chineseName
    pinyinName
    englishName
  }
  attendances (where: {classSession: {id: $classSessionId}}) {
    id
    student {
      id
    }
    status
  }
}
`

export const ATTENDANCE_SUB = /* GraphQL */`
subscription attendances($classSessionId: ID!){
  attendances (classSessionId: $classSessionId){
    id
    student {
      id
    }
    status
  }
}`

export const GET_SESSION_POINTS = /* GraphQL */`
query points($classSessionId: ID!) {
 points(where: { classSession: {id: $classSessionId}}) {
      id 
      value
      student {
        englishName
        chineseName
        id
      }
    }
}
`
export const POINTS_SUB = /* GraphQL */`
subscription sessionPoints($classSessionId: ID!){
  points(classSessionId: $classSessionId){
    mutation
    previousValues {
      id
    }
    node {
      id
      value
      student {
        englishName
        chineseName
        id
      }
    }
    
  }
}
`

export const SESSION_RESULTS = /* GraphQL */`
query sessionResults($id: ID!) {
  classSession (id: $id){
    id
    stage
    startsAt
    startedAt
    endsAt
    endedAt
    number
    group {
      id
      name
    }
    attendances {
      status
      arrivedAt 
      student {
        id
        chineseName
        englishName
        pinyinName
      }
    }
    points {
      value
      student {
        id
        chineseName
        englishName
        pinyinName
      }
    }
  }
}
`
