import Link from 'next/link'
import { getUser } from '@api/users/getUser'
import { getTotalPrice } from '@utils/getTotalPrice'
import {
  Container,
  CartItemContainer,
  CartTotal,
  CheckoutButton,
} from './styles'
import Message from '@components/message/Message'
import CartItem from '@components/cartItem/CartItem'

const CartItems = async () => {
  const user = await getUser()
  const cartItems = user?.cartItems || []
  const totalPrice = getTotalPrice(cartItems)

  return cartItems.length === 0 ? (
    <Message variant='info'>Your cart is empty</Message>
  ) : (
    <Container>
      <CartItemContainer>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} {...cartItem} />
        ))}
      </CartItemContainer>
      <CartTotal>
        <h2 data-testid='total-price'>Total: ${totalPrice}</h2>
        <CheckoutButton as={Link} href='/address' data-testid='checkout-link'>
          Checkout
        </CheckoutButton>
      </CartTotal>
    </Container>
  )
}

export default CartItems
