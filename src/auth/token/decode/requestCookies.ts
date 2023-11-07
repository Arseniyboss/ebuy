import { NextRequest } from 'next/server'
import { verifyToken } from '@/auth/token/verifyToken'

export const decodeToken = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value
  const session = await verifyToken(token)
  return session
}
