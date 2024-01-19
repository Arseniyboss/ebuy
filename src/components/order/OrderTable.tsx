import { Order as OrderType } from '@/types/api'
import { Table } from '@/styles/table'
import Order from '@/components/order/Order'
import Pagination from '@/components/pagination/Pagination'

type Props = {
  orders: OrderType[]
  pages: number
}

const OrderTable = ({ orders, pages }: Props) => {
  return (
    <>
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
