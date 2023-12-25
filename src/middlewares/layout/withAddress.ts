import { redirect } from 'next/navigation'
import { withCartItems } from '@/middlewares/utils/withCartItems'
import { Layout } from '@/middlewares/types'

export const withAddress = (layout: Layout) => {
  return withCartItems(({ props, session }) => {
    if (!session.user.address) {
      redirect('/address')
    }
    return layout(props)
  })
}
