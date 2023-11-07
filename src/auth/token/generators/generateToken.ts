import { SignJWT } from 'jose'
import { UserPayload } from '@/types/jwtPayload'
import { getJwtSecret } from '@/auth/token/getters/getJwtSecret'
import { day } from '@/constants/time'

export const generateToken = async (payload: UserPayload) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const JWT_SECRET = getJwtSecret()

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTime + day)
    .sign(JWT_SECRET)
}
