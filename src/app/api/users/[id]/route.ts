import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import User from '@models/user'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  return NextResponse.json(user)
}
