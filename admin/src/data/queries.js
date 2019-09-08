export const GET_STUDENT = /* GraphQL */`
query student($id: ID!) { 
  student (id: $id){
    chineseName
    pinyinName
    englishName
    id
    groups {
      name
    }
    gender
    pointsTally
  }
}
`

export const ME = /* GraphQL */`
{
  me {
    username
    id
  }
}`

export const ACTIVE_GROUPS = /* GraphQL */`
{
  activeGroups {
    id
    name
    semester {
      name
    }
  }
}
`

export const CURRENT_NEXT_SEMESTER_GROUPS = /* GraphQL */`
{
  currentSemester {
    id
    name
    groups {
      id
      name
    }
  }
  nextSemester {
    id
    name
    groups {
      id
      name
    }
  }
}
`

export const BIRTHDAYS = /* GraphQL */ `
 query {
   students(where: {birthdate_not: null}){
     id
     englishName
     chineseName
     pinyinName
     birthdate
     daysToBirthday
   }
 }`
