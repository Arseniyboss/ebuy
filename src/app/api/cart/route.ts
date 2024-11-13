import { CartItem as Body } from '@/types/api'
import { withAuth } from '@/middleware/api/withAuth'
import { throwError } from '@/utils/api/throwError'
import { generateAuthTokens } from '@/auth/api/generateAuthTokens'

export const POST = withAuth(async ({ request, user }) => {
  const cartItem: Body = await request.json()
  const itemInTheCart = user.cartItems.find(({ id }) => cartItem._id === id)

  if (itemInTheCart) {
    return throwError({ error: 'Item is already in the cart', status: 400 })
  }

  user.cartItems.push(cartItem)
  await user.save()

  return generateAuthTokens(user, 201)
})

export const DELETE = withAuth(async ({ user }) => {
  user.cartItems.remove({})
  await user.save()
  return generateAuthTokens(user)
})
