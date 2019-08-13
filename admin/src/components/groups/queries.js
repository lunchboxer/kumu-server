export const GET_GROUPS = /* GraphQL */`
  {
    groups {
      id
      name
      semester {
        id
        name
        startDate
      }
      students {
        chineseName
        englishName
        pinyinName
        id
      }
    }
  }
`
