export const GET_SESSIONS = /* GraphQL */`
 query getSessions($where: ClassSessionWhereInput){
  classSessions (where: $where) {
    id
    startsAt
    endsAt
    stage
    number
    group {
      id
      name
    }
    lesson {
      id
    }
  }
}`

export const GET_CURRENT_SESSION = /* GraphQL */`
query currentSession($now: DateTime){
  classSessions(where: {
    startsAt_lt: $now,
    endsAt_gt: $now
  }) {
    id
    startsAt
    endsAt
    stage
    number
    group {
      id
      name
    }
  }
}`

export const GET_TODAYS_SESSIONS = /* GraphQL */`
query todaysSessions($now: DateTime, $latest: DateTime){
  classSessions(where: {
    startsAt_lt: $latest,
    endsAt_gt: $now
  }) {
    id
    startsAt
    endsAt
    stage
    number
    group {
      id
      name
    }
  }
}`

export const SESSIONS_SUB = /* GraphQL */`
subscription {
  classSessions {
    mutation
    updatedFields
    previousValues{
      id
      stage
      startsAt
      endsAt
    }
      node {
        id
        stage
        startsAt
        endsAt
        number
        group {
          id
          name
        }
      }
  }
}`

export const TODAYS_SESSIONS_SUB = /* GraphQL */`
subscription {
  classSessions {
    mutation
    updatedFields
    previousValues {
      id
      stage
      startsAt
      endsAt
    }
    node {
      id
      stage
      startsAt
      endsAt
      number
      group {
        id
        name
      }
    }
  }
}`
