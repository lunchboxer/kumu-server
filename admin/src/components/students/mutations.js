export const CREATE_STUDENT = /* GraphQL */` 
mutation createStudent($groupId: ID!, $input: StudentInput!) {
  createStudent(input: $input, groupId: $groupId) {
    id
    chineseName
    englishName
    pinyinName
    birthdate
    gender
    pointsTally
    groups {
      id
      name
      semester {
        id
        name
      }
    }
  }
}
`

export const DELETE_STUDENT = /* GraphQL */` 
mutation deleteStudent($id: ID!) {
  deleteStudent(id:$id) {
    id
    chineseName
    englishName
  }
}
`

export const UPDATE_STUDENT = /* GraphQL */`
mutation updateStudent($id: ID!, $input: StudentInput!) {
  updateStudent(input: $input, id: $id) {
    id
    chineseName
    englishName
    pinyinName
    birthdate
    gender
    pointsTally
    groups {
      id
      name
      semester {
        id
        name
      }
    }
  }
}`

export const MOVE_TO_DIFFERENT_GROUP = /* GraphQL */`
mutation moveStudentToDifferentGroup($oldGroupId: ID!, $newGroupId: ID!, $studentId: ID! ) {
  moveStudentToDifferentGroup(studentId: $studentId, oldGroupId: $oldGroupId, newGroupId: $newGroupId) {
    id
    chineseName
    englishName
    pinyinName
    birthdate
    gender
    pointsTally
    groups {
      id
      name
      semester {
        id
        name
      }
    }
  }
}
`

export const ADD_STUDENT_TO_GROUP = /* GraphQL */`
mutation addStudentToGroup($groupId: ID!, $studentId: ID! ) {
  addStudentToGroup(studentId: $studentId, groupId: $groupId) {
    id
    chineseName
    englishName
    pinyinName
    birthdate
    gender
    pointsTally
    groups {
      id
      name
      semester {
        id
        name
      }
    }
  }
}
`

export const REMOVE_STUDENT_FROM_GROUP = /* GraphQL */`
mutation removeStudentFromGroup($groupId: ID!, $studentId: ID! ) {
  removeStudentFromGroup(studentId: $studentId, groupId: $groupId) {
    id
    chineseName
    englishName
    pinyinName
    birthdate
    gender
    pointsTally
    groups {
      id
      name
      semester {
        id
        name
      }
    }
  }
}
`
