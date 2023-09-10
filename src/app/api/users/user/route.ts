import { NextRequest, NextResponse } from 'next/server'
import { UpdateUserParams as Body } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/api/throwError'
import { setCookie } from '@utils/api/setCookie'
import { generatePayload } from '@auth/token/generators/generatePayload'
import { generateTokenCookie } from '@auth/token/generators/generateTokenCookie'
import User from '@models/user'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id).select('-password')

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  return NextResponse.json(user)
}

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const { name, email, password }: Body = await request.json()
  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)
  const userExists = await User.exists({ email })

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (userExists && user.email !== email) {
    return throwError({ error: 'Email is already in use', status: 400 })
  }

  user.name = name
  user.email = email
  user.password = password || user.password

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie)
}
