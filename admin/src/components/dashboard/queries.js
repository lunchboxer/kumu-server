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

export const INCOMPLETE_SESSIONS = /* GraphQL */ `
  {
    classSessions(where: {lesson: {id_not:null}, report: null}) {
      id
      number
      startsAt
      endsAt
      group {
        name
      }
      report {
        id
        published
      }
    }
  }`
