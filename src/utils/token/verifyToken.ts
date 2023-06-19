import { jwtVerify } from 'jose'
import { getJwtSecret } from './getJwtSecret'

interface Payload {
  id: string
  name: string
}

export const verifyToken = async (token?: string) => {
  if (!token) return

  const JWT_SECRET = getJwtSecret()

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = { id: payload.id, name: payload.name } as Payload
    return user
  } catch (error) {
    console.log('Token is invalid or has expired')
    return
  }
}
