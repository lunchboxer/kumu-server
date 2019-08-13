export const CREATE_REPORT = /* GraphQL */ `
 mutation CreateReport($classSessionId: ID!) {
   createReport(classSessionId: $classSessionId) {
     id
   }
 }`
