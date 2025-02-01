import { Store, useStore } from '@tanstack/react-store'
import { useCallback, useEffect } from 'react'
import { Token } from 'src/models/Token'
import { useRefreshToken } from 'src/mutations/authMutations'
import { hasExpiryDate, parseJwt } from 'src/utils'

const jwtKey = 'AccessToken'
const refreshTokenKey = 'RefreshToken'

const token = localStorage.getItem(jwtKey)
const refreshToken = localStorage.getItem(refreshTokenKey)

export const JwtStore = new Store<Token | undefined>(
  !!token && !!refreshToken ? { token: token, refreshToken } : undefined,
)

export const useJwt = () => {
  const jwt = useStore(JwtStore)
  const { mutateAsync } = useRefreshToken()

  const refreshJwt = useCallback(
    async (token: Token) => {
      const newToken = await mutateAsync(token)
      JwtStore.setState(() => newToken)
    },
    [mutateAsync],
  )

  useEffect(() => {
    if (jwt == null) {
      localStorage.removeItem(jwtKey)
      localStorage.removeItem(refreshTokenKey)
      return
    }

    localStorage.setItem(jwtKey, jwt.token)
    localStorage.setItem(refreshTokenKey, jwt.refreshToken)

    const parsedJwt = parseJwt(jwt.token)
    if (!hasExpiryDate(parsedJwt)) {
      localStorage.removeItem(jwtKey)
      localStorage.removeItem(refreshTokenKey)
      JwtStore.setState(() => undefined)
      return
    }

    const tokenLifeTime = parsedJwt.exp - Date.now() / 1000 - 60

    if (tokenLifeTime < 0) {
      refreshJwt(jwt)
      return
    }

    const id = setTimeout(() => refreshJwt(jwt), tokenLifeTime * 1000)

    return () => clearTimeout(id)
  }, [jwt, refreshJwt])

  return jwt
}

export const useLogOut = () => {
  return useCallback(() => {
    localStorage.removeItem(jwtKey)
    localStorage.removeItem(refreshTokenKey)
    JwtStore.setState(() => undefined)
  }, [])
}
