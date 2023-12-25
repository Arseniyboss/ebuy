import { NextRequest } from 'next/server'
import { connectToDB } from '@/database/mongoDB'
import { getSession } from '@/auth/session/requestHeaders'
import User from '@/models/user'

export const getUser = async (request: NextRequest) => {
  await connectToDB()
  const session = await getSession(request)
  const user = await User.findById(session?.user.id).select('-password')
  return user
}
