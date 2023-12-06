import { CartItem as Body } from '@/types/api'
import { withAuth } from '@/utils/api/withAuth'
import { throwError } from '@/utils/api/throwError'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'

export const POST = withAuth(async ({ request, user }) => {
  const cartItem: Body = await request.json()

  const itemInTheCart = user.cartItems.find(({ id }) => cartItem._id === id)

  if (itemInTheCart) {
    return throwError({ error: 'Item is already in the cart', status: 400 })
  }

  user.cartItems.push(cartItem)

  await user.save()

  const tokenCookie = await getTokenCookie(user)

  return setCookie(tokenCookie, 201)
})

export const DELETE = withAuth(async ({ user }) => {
  user.cartItems = []

  await user.save()

  const tokenCookie = await getTokenCookie(user)

  return setCookie(tokenCookie)
})
