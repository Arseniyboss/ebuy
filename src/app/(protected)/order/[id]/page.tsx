import { Metadata } from 'next'
import { PageParams } from '@/types/params'
import { getSession } from '@/auth/session/cookies'
import { getOrderById } from '@/api/orders/getOrderById'
import { getDeliveryDate } from '@/utils/getters/getDeliveryDate'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { PageContainer } from '@/styles/globals'
import { CartTotal } from '@/app/cart/styles'
import { OrderDetails, OrderId } from '@/app/(protected)/order/styles'
import Address from '@/app/(protected)/order/Address'
import Message from '@/components/feedback/message/Message'
import OrderItem from '@/components/item/OrderItem'
import PayPalButton from './PayPalButton'
import StripeButton from './StripeButton'
import AdminButton from './AdminButton'

export const metadata: Metadata = {
  title: 'Order',
}

const Order = async ({ params }: PageParams) => {
  const { id } = await params
  const { data: order, error } = await getOrderById(id)
  const session = await getSession()

  if (error) {
    return <Message variant="error">{error}</Message>
  }

  if (!order) {
    return <Message variant="error">Order not found</Message>
  }

  if (!session) {
    return <Message variant="error">User not found</Message>
  }

  const { address, paymentMethod, orderItems } = order

  const deliveryDate = getDeliveryDate()
  const totalPrice = getTotalPrice(orderItems)
  return (
    <PageContainer className="container">
      <OrderId>Order {order._id}</OrderId>
      <section className="container" aria-labelledby="order-details">
        <h2 id="order-details">Order Details</h2>
        <OrderDetails className="container">
          {!order.isDelivered && (
            <p data-testid="delivery-date">
              Delivery Date: {order.isPaid ? order.deliveryDate : deliveryDate}
            </p>
          )}
          <Address {...address} />
          <p data-testid="payment-method">Payment Method: {paymentMethod}</p>
          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="error" ariaLive={false}>
              Not Paid
            </Message>
          )}
          {order.isDelivered ? (
            <Message variant="success">Delivered on {order.deliveredAt}</Message>
          ) : (
            <Message variant="error" ariaLive={false}>
              Not Delivered
            </Message>
          )}
        </OrderDetails>
      </section>
      <section className="container" aria-labelledby="order-items">
        <h2 id="order-items">Order Items</h2>
        {orderItems.map((orderItem) => (
          <OrderItem key={orderItem._id} {...orderItem} />
        ))}
      </section>
      <CartTotal aria-label="cart total">
        <p data-testid="total-price">Total: ${formatTotalPrice(totalPrice)}</p>
        {!session.user.isAdmin && !order.isPaid && (
          <>
            {paymentMethod === 'PayPal' && (
              <PayPalButton amount={totalPrice} orderId={order._id} />
            )}
            {paymentMethod === 'Stripe' && (
              <StripeButton orderItems={orderItems} orderId={order._id} />
            )}
          </>
        )}
        {session.user.isAdmin && order.isPaid && !order.isDelivered && (
          <AdminButton orderId={order._id} />
        )}
      </CartTotal>
    </PageContainer>
  )
}

export default Order
