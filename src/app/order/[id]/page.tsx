import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageParams } from 'types/params'
import { getOrderById } from '@api/orders/getOrderById'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { getTotalPrice } from '@utils/getTotalPrice'
import { Container, CartTotal } from '@app/cart/styles'
import { OrderDetails, OrderId } from '@app/order/styles'
import Address from '@app/order/Address'
import Message from '@components/message/Message'
import OrderItem from '@components/OrderItem'

export const metadata: Metadata = {
  title: 'Order',
}

const Order = async ({ params }: PageParams) => {
  const order = await getOrderById(params.id)

  if (!order) {
    return notFound()
  }

  const { address, paymentMethod, orderItems } = order

  const deliveryDate = getDeliveryDate()
  const totalPrice = getTotalPrice(orderItems)

  return (
    <Container>
      <OrderId>Order {order._id}</OrderId>
      <h2>Order Details</h2>
      <OrderDetails>
        {order.isDelivered ? (
          <p data-testid='delivery-date'>Delivered At: {order.deliveredAt}</p>
        ) : (
          <p data-testid='delivery-date'>
            Delivery Date: {order.isPaid ? order.deliveryDate : deliveryDate}
          </p>
        )}
        <Address {...address} />
        <p data-testid='payment-method'>Payment Method: {paymentMethod}</p>
        {order.isDelivered ? (
          <Message variant='success'>Delivered on {order.deliveredAt}</Message>
        ) : (
          <Message variant='error'>Not Delivered</Message>
        )}
        {order.isPaid ? (
          <Message variant='success'>Paid on {order.paidAt}</Message>
        ) : (
          <Message variant='error'>Not Paid</Message>
        )}
      </OrderDetails>
      <h2>Order Items</h2>
      {orderItems.map((orderItem) => (
        <OrderItem key={orderItem._id} {...orderItem} />
      ))}
      <CartTotal>
        <h2 data-testid='total-price'>Total: ${totalPrice}</h2>
      </CartTotal>
    </Container>
  )
}

export default Order
