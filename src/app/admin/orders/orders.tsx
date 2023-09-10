import { notFound } from 'next/navigation'
import { OrdersStatus } from 'types/order'
import { OrdersQueryParams as QueryParams } from 'types/params'
import { getOrders } from '@api/orders/getOrders'
import { Table } from '@styles/table'
import Message from '@components/feedback/message/Message'
import OrderFilter from '@components/order/filter/OrderFilter'
import Order from '@components/order/Order'
import Pagination from '@components/pagination/Pagination'

type Props = {
  searchParams: QueryParams
}

type Status = {
  name: OrdersStatus
  label: string
}

const statuses: Status[] = [
  {
    name: 'not-delivered',
    label: 'Not Delivered',
  },
]

const Orders = async ({ searchParams }: Props) => {
  const data = await getOrders(searchParams)

  if (!data) {
    return notFound()
  }

  const { orders, pages } = data

  return orders.length === 0 ? (
    <Message variant='info'>No orders</Message>
  ) : (
    <>
      <OrderFilter statuses={statuses} />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order key={order._id} {...order} />
          ))}
        </tbody>
      </Table>
      <Pagination pages={pages} />
    </>
  )
}

export default Orders
