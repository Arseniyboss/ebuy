'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types/api'
import { Address, PaymentMethod } from '@/types/base/user'
import { placeOrder } from '@/api/orders/placeOrder'
import { revalidateTag } from '@/api/revalidateTag'
import { CheckoutButton } from '@/app/cart/styles'

type Props = {
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
}

const PlaceOrder = (orderDetails: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setLoading(true)
    const { data: order, error } = await placeOrder(orderDetails)

    if (error || !order) setLoading(false)
    if (error) return alert(error)
    if (!order) return alert('Order not found')

    router.push(`/order/${order._id}`)
    router.refresh()
    revalidateTag('product')
  }
  return (
    <CheckoutButton
      disabled={loading}
      onClick={handleClick}
      data-testid='place-order-button'
    >
      Place Order
    </CheckoutButton>
  )
}

export default PlaceOrder
