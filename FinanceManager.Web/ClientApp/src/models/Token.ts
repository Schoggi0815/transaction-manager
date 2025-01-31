import { hasProp, isObject } from 'src/models/helper'

export type Token = {
  token: string
  refreshToken: string
}

export const isToken = (value: unknown): value is Token =>
  isObject(value) &&
  hasProp<Token, 'token'>(value, 'token', 'string') &&
  hasProp<Token, 'refreshToken'>(value, 'refreshToken', 'string')
