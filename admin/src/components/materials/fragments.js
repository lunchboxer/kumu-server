export const MaterialFields = /* GraphQL */`
  fragment MaterialFields on Material {
    id
    type
    url
    title
    notes
    tags {
       id
       name
    }
  }`
