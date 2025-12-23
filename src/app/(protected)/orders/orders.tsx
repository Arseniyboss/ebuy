import { UserOrdersQueryParams as QueryParams } from '@/types/params'
import { getUserOrders } from '@/api/orders/getUserOrders'
import Message from '@/components/feedback/message/Message'
import OrderTable from '@/components/order/OrderTable'

type Props = {
  searchParams: QueryParams
}

const UserOrders = async ({ searchParams }: Props) => {
  const { data, error } = await getUserOrders(searchParams)

  if (error) {
    return <Message variant="error">{error}</Message>
  }

  if (!data) {
    return <Message variant="error">Orders not found</Message>
  }

  const { orders, pages } = data

  return (
    <>
      {orders.length === 0 ? (
        <Message variant="info">No orders</Message>
      ) : (
        <OrderTable orders={orders} pages={pages} />
      )}
    </>
  )
}

export default UserOrders
