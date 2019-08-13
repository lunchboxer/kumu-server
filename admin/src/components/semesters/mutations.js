export const CREATE_SEMESTER = /* GraphQL */`
  mutation createSemester($input: SemesterInput!) {
    createSemester(input: $input) {
      name
      id
      startDate
      endDate
      groups {
        id
        name
      }
    }
  }
`

export const DELETE_SEMESTER = /* GraphQL */`
  mutation deleteSemester($id: ID!) {
    deleteSemester(id: $id) {
      id
      name
    }
  }
`

export const UPDATE_SEMESTER = /* GraphQL */`
  mutation updateSemester($id: ID!, $input: SemesterInput!) {
  updateSemester(input: $input, id: $id) {
    name
      id
      startDate
      endDate
      groups {
        id
        name
      }
  }
}
`
