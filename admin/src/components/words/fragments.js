export const WordFields = /* GraphQL */ `
  fragment WordFields on Word {
    id
    english
    chinese
    audio
    lessons {
      id
      name
    }
    tags {
      id
      name
    }
  }`
