import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_GROUPS } from './queries'
import { UPDATE_GROUP, CREATE_GROUP, DELETE_GROUP } from './mutations'

const createGroupStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const getres = await request(GET_GROUPS)
      set(getres.groups)
    },
    create: async (name, semesterId) => {
      const response = await request(CREATE_GROUP, { name, semesterId })
      update(previous => [...previous, response.createGroup])
    },
    patch: async (id, name, semesterId) => {
      const response = await request(UPDATE_GROUP, { id, name, semesterId })
      update(previous => previous.map((group) => {
        if (group.id !== id) return group
        return response.updateGroup
      }))
    },
    remove: async id => {
      const response = await request(DELETE_GROUP, { id })
      update(previous =>
        previous.filter(group => response.deleteGroup.id !== group.id)
      )
    }
  }
}

export const groups = createGroupStore()
