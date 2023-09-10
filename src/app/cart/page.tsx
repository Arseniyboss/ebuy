import { Suspense } from 'react'
import { Metadata } from 'next'
import { Heading } from '@styles/globals'
import Spinner from '@components/feedback/spinner/Spinner'
import CartItems from './CartItems'

export const metadata: Metadata = {
  title: 'Cart',
}

const Cart = async () => {
  return (
    <>
      <Heading>Shopping Cart</Heading>
      <Suspense fallback={<Spinner variant='stripe' />}>
        <CartItems />
      </Suspense>
    </>
  )
}

export default Cart
