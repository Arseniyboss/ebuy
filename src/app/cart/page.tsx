import { Metadata } from 'next'
import { getCookie } from '@utils/cookie'
import { CartItem } from 'types/product'
import Message from '@components/message/Message'

export const metadata: Metadata = {
  title: 'Cart',
}

// Fix the error: the combined size of the name and value must be less than or equal to 4096 characters

const Cart = () => {
  const cartItems = getCookie<CartItem[]>('cartItems') || []
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message variant='info'>Your cart is empty</Message>
      ) : (
        <div>
          {cartItems.map((cartItem) => (
            <div key={cartItem._id}>
              <p>{cartItem.name}</p>
              <p>{cartItem.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cart
