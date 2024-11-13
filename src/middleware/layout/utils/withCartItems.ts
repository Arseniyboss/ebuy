import { redirect } from 'next/navigation'
import { withAuth } from '@/middleware/layout/utils/withAuth'
import { Middleware } from '@/middleware/layout/types'

export const withCartItems = (middleware: Middleware) => {
  return withAuth(({ props, session }) => {
    if (!session.user.cartItems) {
      redirect('/cart')
    }
    return middleware({ props, session })
  })
}
