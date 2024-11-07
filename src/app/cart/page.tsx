import { Suspense } from 'react'
import { Metadata } from 'next'
import { Heading } from '@/styles/globals'
import Spinner from '@/components/feedback/spinner/Spinner'
import Cart from './Cart'

export const metadata: Metadata = {
  title: 'Cart',
}

const CartPage = async () => {
  return (
    <>
      <Heading>Shopping Cart</Heading>
      <Suspense fallback={<Spinner variant="stripe" />}>
        <Cart />
      </Suspense>
    </>
  )
}

export default CartPage
