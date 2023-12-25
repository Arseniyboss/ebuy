import { ReactNode } from 'react'
import { withAdminAuth } from '@/middlewares/layout/withAdminAuth'

type Props = {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withAdminAuth(AdminLayout)
