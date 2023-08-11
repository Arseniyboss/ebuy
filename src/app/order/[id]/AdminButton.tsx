'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateOrderToDelivered } from '@api/orders/updateOrderToDelivered'
import { CheckoutButton } from '@app/cart/styles'

type Props = {
  orderId: string
}

const AdminButton = ({ orderId }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelivery = async () => {
    setLoading(true)
    const response = await updateOrderToDelivered(orderId)
    if (!response.ok) {
      setLoading(false)
      alert(response.statusText)
      return
    }
    router.refresh()
  }
  return (
    <CheckoutButton
      disabled={loading}
      onClick={handleDelivery}
      data-testid='admin-button'
    >
      Mark As Delivered
    </CheckoutButton>
  )
}

export default AdminButton
