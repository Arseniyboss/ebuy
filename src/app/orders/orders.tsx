import { notFound } from 'next/navigation'
import { Status } from 'types/order'
import { UserOrdersQueryParams } from 'types/params'
import { getUserOrders } from '@api/orders/getUserOrders'
import { Table } from '@styles/table'
import Message from '@components/message/Message'
import OrderFilter from '@components/orderFilter/OrderFilter'
import Order from '@components/Order'
import Pagination from '@components/pagination/Pagination'

type Props = {
  searchParams: UserOrdersQueryParams
}

const statuses: Status[] = [
  {
    name: 'not-paid',
    label: 'Not Paid',
  },
]

const Orders = async ({ searchParams }: Props) => {
  const data = await getUserOrders(searchParams)

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
