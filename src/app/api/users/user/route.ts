import { NextResponse } from 'next/server'
import { UpdateUserParams as Body } from '@/types/params'
import { withAuth } from '@/utils/api/withAuth'
import { throwError } from '@/utils/api/throwError'
import { generateAuthTokens } from '@/auth/api/generateAuthTokens'
import User from '@/models/user'

export const GET = withAuth(async ({ user }) => {
  return NextResponse.json(user)
})

export const PUT = withAuth(async ({ request, user }) => {
  const { name, email, password }: Body = await request.json()

  const userExists = await User.exists({ email })

  if (userExists && user.email !== email) {
    return throwError({ error: 'Email is already in use', status: 400 })
  }

  user.name = name
  user.email = email

  if (password) {
    user.password = password
  }

  await user.save()

  return generateAuthTokens(user)
})
