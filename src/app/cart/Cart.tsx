import { getUser } from '@/api/users/getUser'
import Message from '@/components/feedback/message/Message'
import CartItems from './CartItems'

const Cart = async () => {
  const { data: user } = await getUser()
  const cartItems = user?.cartItems || []
  return cartItems.length === 0 ? (
    <Message variant="info">Your cart is empty</Message>
  ) : (
    <CartItems cartItems={cartItems} />
  )
}

export default Cart
