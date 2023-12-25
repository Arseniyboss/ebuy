import { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/auth/verifyTokens'

export const getSession = async (request: NextRequest) => {
  const accessToken = request.headers.get('authorization')?.split(' ')[1]
  const session = await verifyAccessToken(accessToken)
  return session
}
