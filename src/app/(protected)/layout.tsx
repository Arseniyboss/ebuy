import { ReactNode } from 'react'
import { withAuth } from '@/middleware/layout/withAuth'

type Props = {
  children: ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withAuth(ProtectedLayout)
