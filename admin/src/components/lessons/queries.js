import { LessonFields } from './fragments'

export const GET_LESSONS = /* GraphQL */`
  query ($orderBy: LessonOrderByInput, $where: LessonWhereInput) {
    lessons (orderBy: $orderBy, where: $where) {
      id
      name
      tags {
        id
        name
      }
    }
  }`

export const LESSON = /* GraphQL */`
  query Lesson($id: ID!) {
    lesson(id: $id){
      ...LessonFields
    }
  }
  ${LessonFields}`
