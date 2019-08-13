import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { LOGIN } from './mutations'

const getAuthFromStorage = () => {
  const coldAuth = window.localStorage.getItem('auth')
  const user = coldAuth ? JSON.parse(coldAuth).user : null
  const token = coldAuth ? JSON.parse(coldAuth).token : null
  return { user, token }
}

const createAuthStore = () => {
  // pull token and user from localStorage if it's there
  const { user, token } = getAuthFromStorage()
  const { subscribe, set, update } = writable({ ...user, token })

  return {
    subscribe,
    login: async (username, password) => {
      const response = await request(LOGIN, { username, password })
      window.localStorage.setItem('auth', JSON.stringify(response.login))
      update(previous => ({
        ...previous,
        ...response.login.user,
        token: response.login.token
      }))
    },
    logout: () => {
      const { user } = getAuthFromStorage()
      window.localStorage.removeItem('auth')
      set({})
      return user && user.username
    }
  }
}

export const auth = createAuthStore()
