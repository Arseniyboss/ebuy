import { NextRequest } from 'next/server'
import { getAccessToken } from '@/auth/api/getCookies'
import { verifyAccessToken } from '@/auth/verifyTokens'

export const getSession = async (request: NextRequest) => {
  const accessToken = getAccessToken(request)
  const session = await verifyAccessToken(accessToken)
  return session
}
