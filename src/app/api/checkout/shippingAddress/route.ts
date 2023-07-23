import { NextRequest } from 'next/server'
import { ShippingAddress } from 'types/user'
import { User as UserType } from 'types/jwtPayload'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import { setCookie } from '@utils/setCookie'
import { generatePayload } from '@auth/generatePayload'
import { generateTokenCookie } from '@auth/generateTokenCookie'
import User from '@models/user'

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const shippingAddress: ShippingAddress = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!user.checkout) {
    user.checkout = {}
  }

  user.checkout.shippingAddress = shippingAddress

  await user.save()

  const payload = generatePayload(user as UserType)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie, 201)
}
