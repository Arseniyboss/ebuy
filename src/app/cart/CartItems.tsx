'use client'

import Link from 'next/link'
import { useOptimistic } from 'react'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { cartReducer } from '@/reducers/cartReducer'
import { PageContainer } from '@/styles/globals'
import { CartTotal, CheckoutButton } from './styles'
import { CartItem as CartItemType } from '@/api/cart/getCartItems'
import CartItem from '@/components/item/CartItem'

type Props = {
  cartItems: CartItemType[]
}

const CartItems = ({ cartItems }: Props) => {
  const [optimisticCartItems, dispatch] = useOptimistic(cartItems, cartReducer)
  const totalPrice = getTotalPrice(optimisticCartItems)
  return (
    <PageContainer className="container">
      <section className="container" aria-label="cart items">
        {optimisticCartItems.map((cartItem) => (
          <CartItem key={cartItem._id} {...cartItem} dispatch={dispatch} />
        ))}
      </section>
      <CartTotal aria-label="cart total">
        <p data-testid="total-price">Total: ${formatTotalPrice(totalPrice)}</p>
        <CheckoutButton as={Link} href="/address" data-testid="checkout-link">
          Checkout
        </CheckoutButton>
      </CartTotal>
    </PageContainer>
  )
}

export default CartItems
