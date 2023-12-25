import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/auth/session/cookies'

type Props = {
  children: ReactNode
}

const AuthLayout = async ({ children }: Props) => {
  const session = await getSession()
  if (session) redirect('/')
  return <>{children}</>
}

export default AuthLayout
