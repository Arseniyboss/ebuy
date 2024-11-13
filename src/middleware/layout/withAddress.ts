import { redirect } from 'next/navigation'
import { withCartItems } from './utils/withCartItems'
import { Layout } from './types'

export const withAddress = (layout: Layout) => {
  return withCartItems(({ props, session }) => {
    if (!session.user.address) {
      redirect('/address')
    }
    return layout(props)
  })
}
