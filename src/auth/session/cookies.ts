import { getAccessToken } from '@/auth/getters/getAccessToken'
import { verifyAccessToken } from '@/auth/verifyTokens'

export const getSession = async () => {
  const accessToken = await getAccessToken()
  const session = await verifyAccessToken(accessToken)
  return session
}
