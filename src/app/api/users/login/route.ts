import { NextRequest } from 'next/server'
import { UserLoginParams as Body } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { throwError } from '@/utils/api/throwError'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'
import User from '@/models/user'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const { email, password }: Body = await request.json()

  const user = await User.findOne({ email })

  const isPasswordValid = await user?.matchPassword(password)

  if (!user || !isPasswordValid) {
    return throwError({ error: 'Invalid credentials', status: 401 })
  }

  const tokenCookie = await getTokenCookie(user)

  return setCookie(tokenCookie)
}
