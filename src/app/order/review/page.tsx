import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { getTotalPrice } from '@utils/getTotalPrice'
import { Container, CartTotal } from '@app/cart/styles'
import { OrderDetails } from '@app/order/styles'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'
import OrderItem from '@components/OrderItem'
import PlaceOrder from './PlaceOrder'

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
        <h1>Order Review</h1>
        <h2>Order Details</h2>
        <OrderDetails>
          <p data-testid='delivery-date'>Delivery Date: {deliveryDate}</p>
          <p data-testid='username'>Username: {user.name}</p>
          <p data-testid='email'>Email: {user.email}</p>
          <p data-testid='street'>Street: {address.street}</p>
          <p data-testid='country'>Country: {address.country}</p>
          <p data-testid='city'>City: {address.city}</p>
          <p data-testid='postal-code'>Postal Code: {address.postalCode}</p>
          <p data-testid='payment-method'>Payment Method: {paymentMethod}</p>
        </OrderDetails>
        <h2>Order Items</h2>
        {cartItems.map((cartItem) => (
          <OrderItem key={cartItem._id} {...cartItem} />
        ))}
        <CartTotal>
          <h2 data-testid='total-price'>Total: ${totalPrice}</h2>
          <PlaceOrder
            orderItems={cartItems}
            address={address}
            paymentMethod={paymentMethod}
            totalPrice={totalPrice}
          />
        </CartTotal>
      </Container>
    </>
  )
}

export default OrderReview
