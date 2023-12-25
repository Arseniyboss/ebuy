import { ReactNode } from 'react'
import { withAddress } from '@/middlewares/layout/withAddress'

type Props = {
  children: ReactNode
}

const PaymentLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withAddress(PaymentLayout)
