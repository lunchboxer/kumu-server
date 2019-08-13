import { readable } from 'svelte/store'

export const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)

  return () => clearInterval(interval)
})

export const everyMinute = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 6e+4)

  return () => clearInterval(interval)
})
