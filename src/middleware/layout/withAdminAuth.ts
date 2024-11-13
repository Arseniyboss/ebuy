import { redirect } from 'next/navigation'
import { withAuth } from './utils/withAuth'
import { Layout } from './types'

export const withAdminAuth = (layout: Layout) => {
  return withAuth(({ props, session }) => {
    if (!session.user.isAdmin) {
      redirect('/')
    }
    return layout(props)
  })
}
