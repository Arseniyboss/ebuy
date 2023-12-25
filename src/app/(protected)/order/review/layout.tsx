import { ReactNode } from 'react'
import { withPayment } from '@/middlewares/layout/withPayment'

type Props = {
  children: ReactNode
}

const OrderReviewLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withPayment(OrderReviewLayout)
