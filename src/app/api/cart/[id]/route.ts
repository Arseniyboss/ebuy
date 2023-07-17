import { NextRequest, NextResponse } from 'next/server'
import { PageParams } from 'types/params'
import { CartItem } from 'types/mongo'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import User from '@models/user'

export const DELETE = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItems = user.cartItems as CartItem[]

  const cartItem = cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  await cartItem.deleteOne()

  await user.save()

  return NextResponse.json(null, { status: 200 })
}
