import { NextRequest } from 'next/server'
import { Address } from '@/types/base/user'
import { connectToDB } from '@/config/mongodb'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import { setCookie } from '@/utils/api/setCookie'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateTokenCookie } from '@/auth/token/generators/generateTokenCookie'

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const address: Address = await request.json()
  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  user.address = address

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie, 201)
}
