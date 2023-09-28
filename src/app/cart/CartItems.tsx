import Link from 'next/link'
import { getUser } from '@api/users/getUser'
import { getTotalPrice } from '@utils/getters/getTotalPrice'
import { formatTotalPrice } from '@utils/formatters/formatTotalPrice'
import {
  Container,
  CartItemContainer,
  CartTotal,
  CheckoutButton,
} from './styles'
import Message from '@components/feedback/message/Message'
import CartItem from '@components/item/CartItem'

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
        <h2 data-testid='total-price'>
          Total: ${formatTotalPrice(totalPrice)}
        </h2>
        <CheckoutButton as={Link} href='/address' data-testid='checkout-link'>
          Checkout
        </CheckoutButton>
      </CartTotal>
    </Container>
  )
}

export default CartItems
