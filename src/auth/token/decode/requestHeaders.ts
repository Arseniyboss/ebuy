import { NextRequest } from 'next/server'
import { verifyToken } from '@/auth/token/verifyToken'

export const decodeToken = async (request: NextRequest) => {
  const token = request.headers.get('authorization')?.split(' ')[1]
  const payload = await verifyToken(token)
  return payload
}
