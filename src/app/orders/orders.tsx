import { notFound } from 'next/navigation'
import { UserOrdersStatus } from '@/types/base/order'
import { UserOrdersQueryParams as QueryParams } from '@/types/params'
import { getUserOrders } from '@/api/orders/getUserOrders'
import { Table } from '@/styles/table'
import Message from '@/components/feedback/message/Message'
import OrderFilter from '@/components/order/filter/OrderFilter'
import Order from '@/components/order/Order'
import Pagination from '@/components/pagination/Pagination'

type Props = {
  searchParams: QueryParams
}

type Status = {
  name: UserOrdersStatus
  label: string
}

const statuses: Status[] = [
  {
    name: 'not-paid',
    label: 'Not Paid',
  },
]

const UserOrders = async ({ searchParams }: Props) => {
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
            <td />
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

export default UserOrders
