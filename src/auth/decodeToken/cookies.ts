import { getToken } from '@auth/getToken'
import { verifyToken } from '@auth/verifyToken'

export const decodeToken = async () => {
  const token = getToken()
  const payload = await verifyToken(token)
  return payload
}
