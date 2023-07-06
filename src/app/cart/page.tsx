import { Metadata } from 'next'
import { CartItem } from 'types/api'
import { Heading } from '@styles/globals'
import Message from '@components/message/Message'

export const metadata: Metadata = {
  title: 'Cart',
}

const Cart = () => {
  const cartItems: CartItem[] = []
  return (
    <>
      <Heading>Shopping Cart</Heading>
      {cartItems.length === 0 ? (
        <Message variant='info'>Your cart is empty</Message>
      ) : (
        <div>
          {/* {cartItems.map((cartItem) => (
             <CartItem key={cartItem._id} {...cartItem} />
          ))} */}
        </div>
      )}
    </>
  )
}

export default Cart
