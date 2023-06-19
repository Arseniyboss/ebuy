import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import { generateTokenCookie } from '@utils/token/generateTokenCookie'
import User from '@models/user'

type Body = {
  email: string
  password: string
}

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
