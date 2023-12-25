import { redirect } from 'next/navigation'
import { getSession } from '@/auth/session/cookies'
import { Layout, Props } from '@/middlewares/types'

export const withCartItems = (layout: Layout) => async (props: Props) => {
  const session = await getSession()
  if (!session!.user.cartItems) redirect('/cart')
  return layout(props)
}
