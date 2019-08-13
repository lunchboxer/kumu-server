export const STUDENT = /* GraphQL */`
query Student($id: ID!){
  student(id: $id) {
    id
    englishName
    chineseName
    birthdate
    pointsTally
  }
  attendances(where: { student: { id: $id } }) {
    id
    status
    classSession {
      id
      lesson {
        name
      }
      number
      endsAt
      endedAt
      group {
        id
        name
        semester{
          id
          startDate
          endDate
        }
      }
    }
  }
}`

export const STUDENTS = /* GraphQL */ `
 query Students ($searchString: String){
   students(searchString: $searchString) {
     id
     englishName
     chineseName
     lastLogin
   }
 }`

export const SESSION = /* GraphQL */ `
  query Session ($id: ID!){
    classSession (id: $id){
      id
      stage
      number
      startsAt
      endsAt
      endedAt
      startedAt
      lesson {
        id
        name
      }
      report {
        summaryEN
        summaryZH
        homeworkEN
        homeworkZH
        performance
        published
        materials {
          id
          type
          title
          url
        }
        words {
          id
          english
          chinese
          audio
        }
      }
      group {
        id
        name
      }
    }
  }`
