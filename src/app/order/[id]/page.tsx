import { PageParams } from 'types/params'
import { Heading } from '@styles/globals'

const Order = ({ params }: PageParams) => {
  return <Heading>Order {params.id}</Heading>
}

export default Order
