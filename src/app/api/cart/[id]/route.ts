import { NextRequest, NextResponse } from 'next/server'
import { PageParams } from 'types/params'
import { User as UserType } from 'types/jwtPayload'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import { setCookie } from '@utils/setCookie'
import { generatePayload } from '@auth/generatePayload'
import { generateTokenCookie } from '@auth/generateTokenCookie'
import User from '@models/user'

export const DELETE = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  await cartItem.deleteOne()

  await user.save()

  const payload = generatePayload(user as UserType)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie)
}

export const PATCH = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const quantity: number = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  cartItem.quantity = quantity

  await user.save()

  return NextResponse.json(null, { status: 200 })
}
