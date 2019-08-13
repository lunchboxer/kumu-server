import { writable } from 'svelte/store'

const selfDestructDelay = 4000 // milliseconds

const generateKey = () => {
  // timestamp with 4 random characters on the end
  const now = new Date()
  const randomCode = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
  return now.toISOString() + randomCode
}

const createNotificationStore = () => {
  const { subscribe, update } = writable({})

  return {
    subscribe,
    remove: id => {
      update(previous => {
        const { [id]: value, ...withoutThisOne } = previous
        return withoutThisOne
      })
    },
    add: function (message) {
      const id = generateKey()
      update(previous => ({ ...previous, [id]: message }))
      setTimeout(() => {
        this.remove(id)
      }, selfDestructDelay)
    }
  }
}

export const notifications = createNotificationStore()
