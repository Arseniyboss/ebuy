import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { getTotalPrice } from '@utils/getTotalPrice'
import { Container, CartTotal, CheckoutButton } from '@app/cart/styles'
import { OrderSummary, OrderDetails } from './styles'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'
import OrderItem from '@components/OrderItem'

export const metadata: Metadata = {
  title: 'Order Review',
}

const OrderReview = async () => {
  const user = await getUser()
  const payload = await decodeToken()

  if (!user) {
    return notFound()
  }

  const cartItems = user.cartItems
  const address = user.address!
  const paymentMethod = user.paymentMethod!

  const deliveryDate = getDeliveryDate()
  const totalPrice = getTotalPrice(cartItems)

  return (
    <>
      <Container>
        <CheckoutSteps user={payload!} center={true} />
        <OrderSummary>
          <h1>Order Review</h1>
          <h2>Order Details</h2>
          <OrderDetails>
            <p>Delivery Date: {deliveryDate}</p>
            <p>Street: {address.street}</p>
            <p>Country: {address.country}</p>
            <p>City: {address.city}</p>
            <p>Postal Code: {address.postalCode}</p>
            <p>Payment Method: {paymentMethod}</p>
          </OrderDetails>
          <h2>Order Items</h2>
          {cartItems.map((cartItem) => (
            <OrderItem key={cartItem._id} {...cartItem} />
          ))}
        </OrderSummary>
        <CartTotal>
          <h2>Total: ${totalPrice}</h2>
          <CheckoutButton>Place Order</CheckoutButton>
        </CartTotal>
      </Container>
    </>
  )
}

export default OrderReview
