import { JWTPayload, jwtVerify } from 'jose'
import { UserPayload } from '@/types/jwtPayload'
import {
  getAccessTokenSecret,
  getRefreshTokenSecret,
} from './getters/getTokenSecrets'

type Token = string | null | undefined

type Payload = UserPayload & JWTPayload

export type Session = {
  user: UserPayload
}

export const verifyToken = async (token: Token, secret: Uint8Array) => {
  if (!token) return

  try {
    const jwtVerifyResult = await jwtVerify(token, secret)
    const payload = jwtVerifyResult.payload as Payload

    const { id, name, isAdmin, cartItems, address, paymentMethod } = payload
    const user = { id, name, isAdmin, cartItems, address, paymentMethod }

    const session: Session = { user }
    return session
  } catch (error) {
    return
  }
}

export const verifyAccessToken = async (accessToken: Token) => {
  const accessTokenSecret = getAccessTokenSecret()
  const session = await verifyToken(accessToken, accessTokenSecret)
  return session
}

export const verifyRefreshToken = async (refreshToken: Token) => {
  const refreshTokenSecret = getRefreshTokenSecret()
  const session = await verifyToken(refreshToken, refreshTokenSecret)
  return session
}
