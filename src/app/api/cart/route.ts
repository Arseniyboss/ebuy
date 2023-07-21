import { NextRequest, NextResponse } from 'next/server'
import { CartItem } from 'types/mongo/documents'
import { CartItem as Body } from 'types/api'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import User from '@models/user'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const cartItem: Body = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItems = user.cartItems as CartItem[]

  const itemInTheCart = cartItems.find(({ id }) => cartItem._id === id)

  if (itemInTheCart) {
    return throwError({ error: 'Item is already in the cart', status: 400 })
  }

  user.cartItems.push(cartItem)

  await user.save()

  return NextResponse.json(null, { status: 201 })
}
