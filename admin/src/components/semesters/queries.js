export const GET_SEMESTERS = /* GraphQL */`
  {
    semesters {
      id
      name
      startDate
      endDate
      groups {
        id
        name
      }
    }
  }
`
