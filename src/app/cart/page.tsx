import { Metadata } from 'next'
import { getCookie } from '@utils/cookie'
import { CartItem } from 'types/product'
import Message from '@components/message/Message'

export const metadata: Metadata = {
  title: 'Cart',
}

// Don't store cartItems in cookies (maximum size of a cookie is 4096 bytes)
// Persist user session in cookies and get cartItems from the Vercel KV database

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
