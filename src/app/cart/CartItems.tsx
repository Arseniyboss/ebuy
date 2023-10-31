import Link from 'next/link'
import { getUser } from '@/api/users/getUser'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { PageContainer } from '@/styles/globals'
import { CartTotal, CheckoutButton } from './styles'
import Message from '@/components/feedback/message/Message'
import CartItem from '@/components/item/CartItem'

const CartItems = async () => {
  const user = await getUser()
  const cartItems = user?.cartItems || []
  const totalPrice = getTotalPrice(cartItems)

  return cartItems.length === 0 ? (
    <Message variant='info'>Your cart is empty</Message>
  ) : (
    <PageContainer className='container'>
      <section className='container' aria-label='cart items'>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} {...cartItem} />
        ))}
      </section>
      <CartTotal aria-label='cart total'>
        <p data-testid='total-price'>Total: ${formatTotalPrice(totalPrice)}</p>
        <CheckoutButton as={Link} href='/address' data-testid='checkout-link'>
          Checkout
        </CheckoutButton>
      </CartTotal>
    </PageContainer>
  )
}

export default CartItems
