import { MaterialFields } from './fragments'

export const MATERIALS = /* GraphQL */ `
  query Materials($orderBy: MaterialOrderByInput, $where: MaterialWhereInput) {
    materials (orderBy: $orderBy, where:$where) {
      ...MaterialFields
    }
  }
  ${MaterialFields}`

export const MATERIAL = /* GraphQL */ `
  query Material($id: ID!){
    material(id: $id) {
      ...MaterialFields
    }
  }
  ${MaterialFields}`
