import { SignJWT } from 'jose'
import { getJwtSecret } from './getJwtSecret'

type Payload = {
  id: string
  name: string
}

export const hour = 60 * 60

export const generateToken = async (payload: Payload) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const JWT_SECRET = getJwtSecret()

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(currentTime + hour)
    .sign(JWT_SECRET)
}
