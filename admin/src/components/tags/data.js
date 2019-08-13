import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { TAGS, TAG } from './queries'
import { CREATE_TAG, UPDATE_TAG, DELETE_TAG } from './mutations'

const createTagsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const response = await request(TAGS)
      const tags = response.tags.sort((a, b) => {
        return a.connections - b.connections
      })
      set(tags)
    },
    remove: async id => {
      await request(DELETE_TAG, { id })
      update(previous => previous && previous.filter(tag => id !== tag.id))
    },
    create: async (name) => {
      const response = await request(CREATE_TAG, { name })
      update(previous => !previous ? [response.createTag] : [...previous, response.createTag])
    },
    patch: async ({ id, input }) => {
      const response = await request(UPDATE_TAG, { id, input })
      update(previous => !previous ? [response.updateTag] : previous.map((tag) => {
        if (tag.id !== id) return tag
        return response.updateTag
      }))
      return response.updateTag
    }
  }
}

export const tags = createTagsStore()

const createTagStore = () => {
  const { subscribe, set } = writable()

  return {
    subscribe,
    get: async (id) => {
      const response = await request(TAG, { id })
      set(response.tag)
    }
  }
}

export const tag = createTagStore()
