import { redirect } from 'next/navigation'
import { withCartItems } from './utils/withCartItems'
import { Layout } from './types'

export const withPayment = (layout: Layout) => {
  return withCartItems(({ props, session }) => {
    if (!session.user.paymentMethod) {
      redirect('/payment')
    }
    return layout(props)
  })
}
