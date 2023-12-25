import { SignJWT } from 'jose'
import { UserPayload } from '@/types/jwtPayload'
import { getRefreshTokenSecret } from '@/auth/getters/getTokenSecrets'

export const generateRefreshToken = async (payload: UserPayload) => {
  const refreshTokenSecret = getRefreshTokenSecret()

  const refreshToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(refreshTokenSecret)

  return refreshToken
}
