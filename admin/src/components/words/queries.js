import { WordFields } from './fragments'

export const WORDS = /* GraphQL */ `
 query Words ($orderBy: WordOrderByInput, $where: WordWhereInput){
   words (orderBy: $orderBy, where:$where){
     ...WordFields
   }
 }
 ${WordFields}`

export const WORD = /* GraphQL */ `
query Word ($id: ID!){
  word (id: $id){
    ...WordFields
  }
}
${WordFields}`
