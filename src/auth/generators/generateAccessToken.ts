import { SignJWT } from 'jose'
import { UserPayload } from '@/types/jwtPayload'
import { fifteenMinutes } from '@/constants/time'
import { getAccessTokenSecret } from '@/auth/getters/getTokenSecrets'

export const generateAccessToken = async (payload: UserPayload) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const accessTokenSecret = getAccessTokenSecret()

  const accessToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTimestamp + fifteenMinutes)
    .sign(accessTokenSecret)

  return accessToken
}
