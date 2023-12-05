import { NextRequest, NextResponse } from 'next/server'
import { UpdateUserParams as Body } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'
import User from '@/models/user'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  return NextResponse.json(user)
}

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const { name, email, password }: Body = await request.json()

  const user = await getUser(request)
  const userExists = await User.exists({ email })

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (userExists && user.email !== email) {
    return throwError({ error: 'Email is already in use', status: 400 })
  }

  user.name = name
  user.email = email

  if (password) {
    user.password = password
  }

  await user.save()

  const tokenCookie = await getTokenCookie(user)

  return setCookie(tokenCookie)
}
