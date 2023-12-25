import { redirect } from 'next/navigation'
import { withCartItems } from '@/middlewares/utils/withCartItems'
import { Layout } from '@/middlewares/types'

export const withPayment = (layout: Layout) => {
  return withCartItems(({ props, session }) => {
    if (!session.user.paymentMethod) {
      redirect('/payment')
    }
    return layout(props)
  })
}
