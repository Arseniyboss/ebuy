import { redirect } from 'next/navigation'
import { withAuth } from '@/middlewares/utils/withAuth'
import { Layout } from '@/middlewares/types'

export const withCartItems = (layout: Layout) => {
  return withAuth(({ props, session }) => {
    if (!session.user.cartItems) {
      redirect('/cart')
    }
    return layout(props)
  })
}
