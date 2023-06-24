import { jwtVerify } from 'jose'
import { JwtPayload } from 'types/jwtPayload'
import { getJwtSecret } from './getJwtSecret'

export const verifyToken = async (token?: string) => {
  if (!token) return

  const JWT_SECRET = getJwtSecret()

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = { id: payload.id, name: payload.name } as JwtPayload
    return user
  } catch (error) {
    return
  }
}
