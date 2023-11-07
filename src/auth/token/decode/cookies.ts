import { getToken } from '@/auth/token/getters/getToken'
import { verifyToken } from '@/auth/token/verifyToken'

export const decodeToken = async () => {
  const token = await getToken()
  const session = await verifyToken(token)
  return session
}
