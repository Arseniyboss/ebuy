import { Status as StatusName } from '@/types/order'
import { Order as OrderType } from '@/types/api'
import { Table } from '@/styles/table'
import OrderFilter from '@/components/order/filter/OrderFilter'
import Order from '@/components/order/Order'
import Pagination from '@/components/pagination/Pagination'

export type Status = {
  name: StatusName
  label: string
}

type Props = {
  statuses: Status[]
  orders: OrderType[]
  pages: number
}

const OrderTable = ({ statuses, orders, pages }: Props) => {
  return (
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

export default OrderTable
