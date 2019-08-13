export const CREATE_TAG = /* GraphQL */ `
 mutation CreateTag($name: String!) {
   createTag(name:$name) {
     id
     name
     connections
   }
 }`

export const UPDATE_TAG = /* GraphQL */ `
  mutation UpdateTag($id: ID!, $input: TagUpdateInput!) {
    updateTag(id: $id, input:$input) {
      id
      name
      connections
    }
  }`

export const DELETE_TAG = /* GraphQL */ `
 mutation DeleteTag ($id: ID!) {
   deleteTag(id:$id) {
     id
   }
 }`
