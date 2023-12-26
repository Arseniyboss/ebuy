import { redirect } from 'next/navigation'
import { withAuth } from '@/middlewares/utils/withAuth'
import { Middleware } from '@/middlewares/types'

export const withCartItems = (middleware: Middleware) => {
  return withAuth(({ props, session }) => {
    if (!session.user.cartItems) {
      redirect('/cart')
    }
    return middleware({ props, session })
  })
}
