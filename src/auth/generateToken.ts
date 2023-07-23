import { SignJWT } from 'jose'
import { UserPayload } from 'types/jwtPayload'
import { getJwtSecret } from './getJwtSecret'

export const hour = 60 * 60

export const generateToken = async (payload: UserPayload) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const JWT_SECRET = getJwtSecret()

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTime + hour)
    .sign(JWT_SECRET)
}
