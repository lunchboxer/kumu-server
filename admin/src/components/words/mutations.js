import { WordFields } from './fragments'

export const CREATE_WORD = /* GraphQL */ `
 mutation CreateWord ($input: WordCreateInput!){
   createWord (input: $input) {
     ...WordFields
   }
 }
 ${WordFields}`

export const UPDATE_WORD = /* GraphQL */ `
mutation UpdateWord ($input: WordUpdateInput!, $id: ID!){
  updateWord (input: $input, id:$id) {
    ...WordFields
  }
}
${WordFields}`

export const DELETE_WORD = /* GraphQL */ `
mutation DeleteWord ($id: ID!){
  deleteWord (id:$id) {
    id
  }
}`
