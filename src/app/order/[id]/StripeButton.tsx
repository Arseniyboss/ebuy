'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from 'types/api'
import { CheckoutButton } from '@app/cart/styles'
import { createCheckoutSession } from '@api/stripe/createCheckoutSession'

type Props = {
  orderItems: CartItem[]
}

// To test payment success:

// 1.run npm run webhook to listen to stripe events locally
// 2.click Stripe Checkout button
// 3.complete the payment to see 'Payment Successful!' in the console

const StripeButton = ({ orderItems }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStripe = async () => {
    setLoading(true)
    const sessionUrl = await createCheckoutSession(orderItems)
    if (!sessionUrl) {
      return setLoading(false)
    }
    router.push(sessionUrl)
  }

  return (
    <CheckoutButton disabled={loading} onClick={handleStripe}>
      Stripe Checkout
    </CheckoutButton>
  )
}

export default StripeButton
