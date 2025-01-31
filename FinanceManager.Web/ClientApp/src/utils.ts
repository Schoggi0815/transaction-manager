import { JwtStore } from 'src/hooks/useJwt'

export const isListOf =
  <T>(isFunction: (value: unknown) => value is T) =>
  (value: unknown): value is T[] =>
    Array.isArray(value) && value.every(v => isFunction(v))

export const parseJwt = (token: string): unknown => {
  const split = token.split('.')
  if (split.length < 2) {
    return undefined
  }

  const base64Url = split[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const hasExpiryDate = (data: unknown): data is { exp: number } =>
  typeof data === 'object' &&
  data != null &&
  'exp' in data &&
  typeof data.exp === 'number'

export const getJwt = () => {
  const token = JwtStore.state
  if (token == null) {
    throw new Error('No token found')
  }

  return token.token
}
