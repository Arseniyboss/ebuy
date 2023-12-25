import { redirect } from 'next/navigation'
import { withAuth } from '@/middlewares/utils/withAuth'
import { LayoutHandler } from '@/middlewares/types'

export const withCartItems = (handler: LayoutHandler) => {
  return withAuth(({ props, session }) => {
    if (!session.user.cartItems) {
      redirect('/cart')
    }
    return handler({ props, session })
  })
}
