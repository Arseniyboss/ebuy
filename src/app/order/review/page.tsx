import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@/api/users/getUser'
import { decodeToken } from '@/auth/token/decode/cookies'
import { getDeliveryDate } from '@/utils/getters/getDeliveryDate'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { PageContainer } from '@/styles/globals'
import { CartTotal } from '@/app/cart/styles'
import { OrderDetails } from '@/app/order/styles'
import CheckoutSteps from '@/components/checkoutSteps/CheckoutSteps'
import Address from '@/app/order/Address'
import OrderItem from '@/components/item/OrderItem'
import PlaceOrder from './PlaceOrder'

export const metadata: Metadata = {
  title: 'Order Review',
}

const OrderReview = async () => {
  const user = await getUser()
  const session = await decodeToken()

  if (!user) {
    return notFound()
  }

  const cartItems = user.cartItems
  const address = user.address!
  const paymentMethod = user.paymentMethod!

  const deliveryDate = getDeliveryDate()
  const totalPrice = getTotalPrice(cartItems)

  return (
    <PageContainer className='container'>
      <CheckoutSteps user={session!.user} center={true} />
      <h1>Order Review</h1>
      <section className='container' aria-labelledby='order-details'>
        <h2 id='order-details'>Order Details</h2>
        <OrderDetails className='container'>
          <p data-testid='delivery-date'>Delivery Date: {deliveryDate}</p>
          <Address {...address} />
          <p data-testid='payment-method'>Payment Method: {paymentMethod}</p>
        </OrderDetails>
      </section>
      <section className='container' aria-labelledby='order-items'>
        <h2 id='order-items'>Order Items</h2>
        {cartItems.map((cartItem) => (
          <OrderItem key={cartItem._id} {...cartItem} />
        ))}
      </section>
      <CartTotal aria-label='cart total'>
        <p data-testid='total-price'>Total: ${formatTotalPrice(totalPrice)}</p>
        <PlaceOrder
          orderItems={cartItems}
          address={address}
          paymentMethod={paymentMethod}
          totalPrice={totalPrice}
        />
      </CartTotal>
    </PageContainer>
  )
}

export default OrderReview
