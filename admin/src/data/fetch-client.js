const fetch = window.fetch

// const endpoint = process.env.NODE_ENV === 'production'
//   ? process.env.PROD_API_ENDPOINT
//   : process.env.DEV_API_ENDPOINT

export const request = async (query, variables) => {
  const coldAuth = window.localStorage.getItem('auth')
  const token = coldAuth ? JSON.parse(coldAuth).token : null
  const body = typeof query === 'function'
    ? query(variables)
    : JSON.stringify({ query, variables })
  const response = await fetch(process.env.API_ENDPOINT, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || ''
    },
    body
  })
  const result = response && await response.json()
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
