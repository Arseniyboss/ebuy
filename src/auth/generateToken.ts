import { SignJWT } from 'jose'
import { JwtPayload } from 'types/jwtPayload'
import { getJwtSecret } from './getJwtSecret'

export const hour = 60 * 60

export const generateToken = async (payload: JwtPayload) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const JWT_SECRET = getJwtSecret()

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTime + hour)
    .sign(JWT_SECRET)
}
