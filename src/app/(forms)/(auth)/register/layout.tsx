import { ReactNode } from 'react'
import { Metadata } from 'next'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default RegisterLayout
