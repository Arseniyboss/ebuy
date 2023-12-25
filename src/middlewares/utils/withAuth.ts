import { redirect } from 'next/navigation'
import { getSession } from '@/auth/session/cookies'
import { LayoutHandler, Props } from '@/middlewares/types'

export const withAuth = (handler: LayoutHandler) => async (props: Props) => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return handler({ props, session })
}
