import { LessonFields } from './fragments'

export const CREATE_LESSON = /* GraphQL */`
  mutation CreateLesson($input: LessonCreateInput!){
    createLesson(input: $input) {
      ...LessonFields
    }
  }
  ${LessonFields}`

export const UPDATE_LESSON = /* GraphQL */`
  mutation UpdateLesson($input: LessonUpdateInput!, $id: ID!){
    updateLesson(input: $input, id: $id) {
      ...LessonFields
    }
  }
  ${LessonFields}`

export const DELETE_LESSON = /* GraphQL */`
  mutation DeleteLesson($id: ID!){
    deleteLesson(id: $id) {
      id
    }
  }`
