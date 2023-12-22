import { SignJWT } from 'jose'
import { UserPayload } from '@/types/jwtPayload'
import { getCurrentTimestamp } from '@/utils/getters/getCurrentTimestamp'
import { getJwtSecret } from '@/auth/token/getters/getJwtSecret'
import { day } from '@/constants/time'

export const generateToken = async (payload: UserPayload) => {
  const currentTimestamp = getCurrentTimestamp()
  const JWT_SECRET = getJwtSecret()
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTimestamp + day)
    .sign(JWT_SECRET)
}
