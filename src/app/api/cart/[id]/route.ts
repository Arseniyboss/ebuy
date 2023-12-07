import { NextResponse } from 'next/server'
import { withAuth } from '@/utils/api/withAuth/dynamicHandler'
import { throwError } from '@/utils/api/throwError'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'

export const DELETE = withAuth(async ({ user, params }) => {
  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  await cartItem.deleteOne()
  await user.save()
  const tokenCookie = await getTokenCookie(user)
  return setCookie(tokenCookie)
})

export const PATCH = withAuth(async ({ request, user, params }) => {
  const quantity: number = await request.json()
  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  cartItem.quantity = quantity

  await user.save()

  return NextResponse.json(null, { status: 200 })
})
