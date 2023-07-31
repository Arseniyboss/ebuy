'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Address, PaymentMethod } from 'types/user'
import { CartItem } from 'types/api'
import { clearCart } from '@api/cart/clearCart'
import { updateProduct } from '@api/products/updateProduct'
import { revalidateTag } from '@api/revalidateTag'
import { CheckoutButton } from '@app/cart/styles'

type Props = {
  order: {
    orderItems: CartItem[]
    address: Address
    paymentMethod: PaymentMethod
    totalPrice: number
  }
}

const PlaceOrder = ({ order }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateStock = () => {
    order.orderItems.forEach((item) => updateProduct(item._id, item.quantity))
  }

  const placeOrder = () => {
    setLoading(true)
    // createOrder(order)
    updateStock()
    clearCart()
    router.push('/order/123456')
    router.refresh()
    revalidateTag('product')
  }
  return (
    <CheckoutButton disabled={loading} onClick={placeOrder}>
      Place Order
    </CheckoutButton>
  )
}

export default PlaceOrder
