import { NextRequest, NextResponse } from 'next/server'
import { ShippingAddress } from 'types/user'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import User from '@models/user'

export const PUT = async (request: NextRequest) => {
  await connectToDB()

  const shippingAddress: ShippingAddress = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  user.checkout = user.checkout || {}
  user.checkout.shippingAddress = shippingAddress

  await user.save()

  return NextResponse.json(null, { status: 201 })
}
