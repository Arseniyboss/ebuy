import { Metadata } from 'next'
import { PageParams } from 'types/params'
import { OrderId } from './styles'

export const metadata: Metadata = {
  title: 'Order',
}

const Order = ({ params }: PageParams) => {
  return <OrderId>Order {params.id}</OrderId>
}

export default Order
