export const MaterialFields = /* GraphQL */`
  fragment MaterialFields on Material {
    id
    type
    url
    title
    notes
    imageUrl
    tags {
       id
       name
    }
  }`
