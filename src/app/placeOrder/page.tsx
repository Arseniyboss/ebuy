import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { getTotalPrice } from '@utils/getTotalPrice'
import { CartTotal, CheckoutButton } from '@app/cart/styles'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'
import OrderItem from '@components/orderItem/OrderItem'

const PlaceOrder = async () => {
  const user = await getUser()
  const payload = await decodeToken()

  if (!user) {
    return notFound()
  }

  const cartItems = user.cartItems
  const shippingAddress = user.shippingAddress!
  const paymentMethod = user.paymentMethod!

  const deliveryDate = getDeliveryDate()
  const totalPrice = getTotalPrice(cartItems)

  return (
    <>
      <CheckoutSteps user={payload!} center={true} />
      <h2>Shipping</h2>
      <p>Delivery date: {deliveryDate}</p>
      <p>Address: {shippingAddress.address}</p>
      <p>Country: {shippingAddress.country}</p>
      <p>City: {shippingAddress.city}</p>
      <p>Postal Code: {shippingAddress.postalCode}</p>
      <h2>Payment Method</h2>
      <p>Method: {paymentMethod}</p>
      <h2>Order Items</h2>
      {cartItems.map((cartItem) => (
        <OrderItem key={cartItem._id} {...cartItem} />
      ))}
      <CartTotal>
        <h2>Total: ${totalPrice}</h2>
        <CheckoutButton>Place Order</CheckoutButton>
      </CartTotal>
    </>
  )
}

export default PlaceOrder
