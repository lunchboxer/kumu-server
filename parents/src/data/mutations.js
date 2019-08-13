export const LOGIN = /* GraphQL */`
  mutation StudentLogin($studentId: ID!, $password: String!) {
    studentLogin(studentId: $studentId, password: $password) {
      token
      student {
        id
        englishName
        chineseName
        lastLogin
      }
    }
  }
`

export const CREATE_STUDENT_PASSWORD = /* GraphQL */ `
 mutation CreateStudentPassword($studentId: ID!, $password: String!) {
   createStudentPassword(studentId: $studentId, password: $password) {
     token
     student {
       id
       englishName
       chineseName
       lastLogin
     }
   }
 }`
