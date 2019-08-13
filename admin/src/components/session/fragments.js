export const AllSessionFields = /* GraphQL */`
  fragment AllSessionFields on ClassSession {
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
     report {
      id
      published
      homeworkEN
      homeworkZH
      summaryEN
      summaryZH
      performance
      materials {
        id
        type
        title
        url
        notes
      }
      words {
        id
        english
        chinese
        audio
      }
    }
    lesson {
      id
      name
    }
  }
`
