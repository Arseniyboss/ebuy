import { NextRequest } from 'next/server'
import { UserLoginParams as Body } from 'types/params'
import { User as UserType } from 'types/jwtPayload'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import { setCookie } from '@utils/setCookie'
import { generatePayload } from '@auth/generatePayload'
import { generateTokenCookie } from '@auth/generateTokenCookie'
import User from '@models/user'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const { email, password }: Body = await request.json()

  const user = await User.findOne({ email })

  const isPasswordValid = await user?.matchPassword(password)

  if (!user || !isPasswordValid) {
    return throwError({ error: 'Invalid credentials', status: 401 })
  }

  const payload = generatePayload(user as UserType)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie)
}
