import { getUser } from '@api/users/getUser'
import Message from '@components/message/Message'
import CartItem from '@components/cartItem/CartItem'

const CartItems = async () => {
  const user = await getUser()
  const cartItems = user?.cartItems || []

  return cartItems.length === 0 ? (
    <Message variant='info'>Your cart is empty</Message>
  ) : (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem._id} {...cartItem} />
      ))}
    </div>
  )
}

export default CartItems
