import { writable } from 'svelte/store'
import { push } from 'svelte-spa-router'
import { request } from '../../data/fetch-client'
import { WORDS, WORD } from './queries'
import {
  CREATE_WORD,
  UPDATE_WORD,
  DELETE_WORD
} from './mutations'

const createWordsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async (options = {}) => {
      const response = await request(WORDS, {
        orderBy: options.orderBy,
        where: options.where
      })
      set(response.words)
    },
    create: async (input) => {
      const response = await request(CREATE_WORD, { input })
      update(previous => !previous ? [response.createWord]
        : [...previous, response.createWord])
    },
    remove: async id => {
      await request(DELETE_WORD, { id })
      update(previous => previous && previous.filter(w => w.id !== id))
      word.update(previous => (previous && previous.id === id) ? null : previous)
    },
    patch: async ({ input, id }) => {
      const response = await request(UPDATE_WORD, { id, input })
      update(previous => !previous ? [response.updateWord] : previous.map(w => {
        if (w.id !== id) return w
        return response.updateWord
      }))
      word.update(previous => {
        if (previous && previous.id === id) {
          return response.updateWord
        }
        return previous
      })
    }
  }
}

export const words = createWordsStore()

const createWordStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    patch: words.patch,
    get: async (id) => {
      const response = await request(WORD, { id })
      if (response.word === null) push(`/not-found/word/${id}`)
      set(response.word)
    }
  }
}

export const word = createWordStore()
