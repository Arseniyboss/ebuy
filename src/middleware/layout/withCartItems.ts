import { redirect } from 'next/navigation'
import { withAuth } from './utils/withAuth'
import { Layout } from './types'

export const withCartItems = (layout: Layout) => {
  return withAuth(({ props, session }) => {
    if (!session.user.cartItems) {
      redirect('/cart')
    }
    return layout(props)
  })
}
