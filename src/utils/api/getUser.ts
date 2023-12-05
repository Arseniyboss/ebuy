import { NextRequest } from 'next/server'
import { decodeToken } from '@/auth/token/decode/requestHeaders'
import User from '@/models/user'

export const getUser = async (request: NextRequest) => {
  const session = await decodeToken(request)
  const user = await User.findById(session?.user.id).select('-password')
  return user
}
