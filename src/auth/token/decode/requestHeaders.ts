import { NextRequest } from 'next/server'
import { verifyToken } from '@/auth/token/verifyToken'

export const decodeToken = async (request: NextRequest) => {
  const token = request.headers.get('authorization')?.split(' ')[1]
  const session = await verifyToken(token)
  return session
}
