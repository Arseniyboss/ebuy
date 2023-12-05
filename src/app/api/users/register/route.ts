import { NextRequest } from 'next/server'
import { UserRegisterParams as Body } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { throwError } from '@/utils/api/throwError'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'
import User from '@/models/user'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const { name, email, password }: Body = await request.json()

  const userExists = await User.exists({ email })

  if (userExists) {
    return throwError({ error: 'Email is already in use', status: 400 })
  }

  const user = await User.create({ name, email, password })

  const tokenCookie = await getTokenCookie(user)

  return setCookie(tokenCookie, 201)
}
