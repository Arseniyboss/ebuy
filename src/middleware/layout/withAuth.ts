import { redirect } from 'next/navigation'
import { getSession } from '@/auth/session/cookies'
import { Layout, Props } from './types'

export const withAuth = (layout: Layout) => async (props: Props) => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return layout(props)
}
