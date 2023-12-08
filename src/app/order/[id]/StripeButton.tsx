'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types/api'
import { CheckoutButton } from '@/app/cart/styles'
import { createCheckoutSession } from '@/api/stripe/createCheckoutSession'

type Props = {
  orderItems: CartItem[]
  orderId: string
}

const StripeButton = ({ orderItems, orderId }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStripe = async () => {
    setLoading(true)

    const { data: sessionUrl, error } = await createCheckoutSession(
      orderItems,
      orderId
    )

    if (error || !sessionUrl) setLoading(false)
    if (error) return alert(error)
    if (!sessionUrl) return alert('Session not found')

    router.push(sessionUrl)
  }

  return (
    <CheckoutButton
      disabled={loading}
      onClick={handleStripe}
      data-testid='stripe-button'
    >
      Stripe Checkout
    </CheckoutButton>
  )
}

export default StripeButton
