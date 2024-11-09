import { getCartItems } from '@/api/cart/getCartItems'
import Message from '@/components/feedback/message/Message'
import CartItems from './CartItems'

const Cart = async () => {
  const cartItems = await getCartItems()
  return cartItems.length === 0 ? (
    <Message variant="info">Your cart is empty</Message>
  ) : (
    <CartItems cartItems={cartItems} />
  )
}

export default Cart
