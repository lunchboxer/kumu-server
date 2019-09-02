exports.STUDENT = /* GraphQL */`
query Student($id: ID!, $semesterId: ID!){
  student(id: $id) {
    id
    englishName
    chineseName
    birthdate
    pointsTally
  }
  attendances(where: { 
    student: { id: $id }
    classSession: { group: {semester: {id: $semesterId }}}
  }) {
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

exports.SESSION = /* GraphQL */ `
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
          notes
          imageUrl
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
