import { NextRequest, NextResponse } from 'next/server'
import { UserCredentials as Body } from 'types/api'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
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

  const tokenCookie = await generateTokenCookie({
    id: user.id,
    name: user.name,
  })

  return NextResponse.json(null, {
    status: 200,
    headers: { 'Set-Cookie': tokenCookie },
  })
}
