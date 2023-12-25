import { ReactNode } from 'react'
import { Metadata } from 'next'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Login',
}

const LoginLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default LoginLayout
