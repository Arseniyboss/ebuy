import { NextRequest } from 'next/server'
import { PaymentMethod } from 'types/base/user'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/token/decode/requestHeaders'
import { throwError } from '@utils/api/throwError'
import { setCookie } from '@utils/api/setCookie'
import { generatePayload } from '@auth/token/generators/generatePayload'
import { generateTokenCookie } from '@auth/token/generators/generateTokenCookie'
import User from '@models/user'

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const paymentMethod: PaymentMethod = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  user.paymentMethod = paymentMethod

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie, 201)
}
