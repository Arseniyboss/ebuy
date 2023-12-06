import { NextRequest } from 'next/server'
import { connectToDB } from '@/config/mongodb'
import { decodeToken } from '@/auth/token/decode/requestHeaders'
import User from '@/models/user'

export const getUser = async (request: NextRequest) => {
  await connectToDB()
  const session = await decodeToken(request)
  const user = await User.findById(session?.user.id).select('-password')
  return user
}
