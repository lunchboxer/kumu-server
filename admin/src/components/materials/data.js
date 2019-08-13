import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { MATERIALS, MATERIAL } from './queries'
import {
  CREATE_MATERIAL,
  UPDATE_MATERIAL,
  DELETE_MATERIAL
} from './mutations'

const createMaterialsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    get: async (options = {}) => {
      const { orderBy, where } = options
      const response = await request(MATERIALS, { orderBy, where })
      set(response.materials)
    },
    create: async (input) => {
      const response = await request(CREATE_MATERIAL, { input })
      update(previous => !previous ? [response.createMaterial]
        : [...previous, response.createMaterial])
    },
    remove: async id => {
      await request(DELETE_MATERIAL, { id })
      update(previous => previous && previous.filter(m => m.id !== id))
      material.update(previous => (previous && previous.id === id) ? null : previous)
    },
    patch: async ({ input, id }) => {
      const response = await request(UPDATE_MATERIAL, { id, input })
      update(previous => !previous ? [response.updateMaterial] : previous.map(m => {
        if (m.id !== id) return m
        return response.updateMaterial
      }))
      material.update(previous => {
        if (previous && previous.id === id) {
          return response.updateMaterial
        }
        return previous
      })
    }
  }
}

export const materials = createMaterialsStore()

const createMaterialStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    patch: materials.patch,
    get: async (id) => {
      const response = await request(MATERIAL, { id })
      set(response.material)
    }
  }
}

export const material = createMaterialStore()
