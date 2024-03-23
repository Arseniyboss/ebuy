'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateOrderToDelivered } from '@/api/orders/updateOrderToDelivered'
import { revalidateTag } from '@/api/revalidateTag'
import { CheckoutButton } from '@/app/cart/styles'

type Props = {
  orderId: string
}

const AdminButton = ({ orderId }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setLoading(true)
    const { error } = await updateOrderToDelivered(orderId)
    if (error) {
      setLoading(false)
      alert(error)
      return
    }
    router.refresh()
    revalidateTag('order')
  }
  return (
    <CheckoutButton
      disabled={loading}
      onClick={handleClick}
      data-testid='admin-button'
    >
      Mark As Delivered
    </CheckoutButton>
  )
}

export default AdminButton
