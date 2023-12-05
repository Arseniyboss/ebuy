import { NextRequest } from 'next/server'
import { CartItem as Body } from '@/types/api'
import { connectToDB } from '@/config/mongodb'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import { setCookie } from '@/utils/api/setCookie'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateTokenCookie } from '@/auth/token/generators/generateTokenCookie'

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const cartItem: Body = await request.json()
  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const itemInTheCart = user.cartItems.find(({ id }) => cartItem._id === id)

  if (itemInTheCart) {
    return throwError({ error: 'Item is already in the cart', status: 400 })
  }

  user.cartItems.push(cartItem)

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie, 201)
}

export const DELETE = async (request: NextRequest) => {
  await connectToDB()

  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  user.cartItems = []

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie)
}
