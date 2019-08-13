export const TAGS = /* GraphQL */ `
 {
   tags {
     id
     name
     connections
   }
 }`

export const TAG = /* GraphQL */ `
 query ($id: ID!){
   tag (id: $id) {
     id
     name
     materials {
       id
       title
     }
    words {
      id
      english
    }
    lessons {
      id
      name
    }
   }
 }`
