import { NextRequest, NextResponse } from 'next/server'
import { User as Body } from 'types/api'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import { generateTokenCookie } from '@auth/generateTokenCookie'
import User from '@models/user'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const { name, email, password }: Body = await request.json()

  const userExists = await User.findOne({ email })

  if (userExists) {
    return throwError({ error: 'Email is already in use', status: 400 })
  }

  const user = await User.create({ name, email, password })

  const tokenCookie = await generateTokenCookie({
    id: user.id,
    name: user.name,
  })

  return NextResponse.json(null, {
    status: 201,
    headers: { 'Set-Cookie': tokenCookie },
  })
}
