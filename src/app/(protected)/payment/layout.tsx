import { ReactNode } from 'react'
import { withAddress } from '@/middleware/layout/withAddress'

type Props = {
  children: ReactNode
}

const PaymentLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withAddress(PaymentLayout)
