import { MaterialFields } from './fragments'

export const CREATE_MATERIAL = /* GraphQL */ `
 mutation CreateMaterial($input: MaterialCreateInput!) {
   createMaterial(input: $input) {
     ...MaterialFields
   }
 }
 ${MaterialFields}`

export const UPDATE_MATERIAL = /* GraphQL */ `
mutation UpdateMaterial($input: MaterialUpdateInput!, $id:ID!) {
  updateMaterial(input: $input, id: $id) {
    ...MaterialFields
  }
}
${MaterialFields}`

export const DELETE_MATERIAL = /* GraphQL */ `
mutation DeleteMaterial($id:ID!) {
  deleteMaterial(id: $id) {
    id
  }
}`
