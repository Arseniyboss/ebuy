import { redirect } from 'next/navigation'
import { withAuth } from '@/middlewares/utils/withAuth'
import { Layout } from '@/middlewares/types'

export const withAdminAuth = (layout: Layout) => {
  return withAuth(({ props, session }) => {
    if (!session.user.isAdmin) {
      redirect('/')
    }
    return layout(props)
  })
}
