import { redirect } from 'next/navigation'
import { getSession } from '@/auth/session/cookies'
import { Middleware, Props } from '@/middleware/layout/types'

export const withAuth = (middleware: Middleware) => async (props: Props) => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return middleware({ props, session })
}
