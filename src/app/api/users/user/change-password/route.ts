import { NextRequest } from 'next/server'
import { UpdateUserPasswordParams as Body } from '@/types/params'
import { connectToDB } from '@/database/mongoDB'
import { throwError } from '@/utils/api/throwError'
import { getSession } from '@/auth/session/requestHeaders'
import { generateAuthTokens } from '@/auth/api/generateAuthTokens'
import User from '@/models/user'

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const { currentPassword, newPassword }: Body = await request.json()

  const session = await getSession(request)
  const user = await User.findById(session?.user.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const isCurrentPasswordValid = await user.matchPassword(currentPassword)

  if (!isCurrentPasswordValid) {
    return throwError({ error: 'Current password is invalid', status: 401 })
  }

  user.password = newPassword

  await user.save()

  return generateAuthTokens(user)
}
