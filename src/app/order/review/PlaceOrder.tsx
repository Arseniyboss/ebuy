'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from 'types/api'
import { Address, PaymentMethod } from 'types/user'
import { clearCart } from '@api/cart/clearCart'
import { updateProduct } from '@api/products/updateProduct'
import { createOrder } from '@api/orders/createOrder'
import { revalidateTag } from '@api/revalidateTag'
import { CheckoutButton } from '@app/cart/styles'

type Props = {
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
  totalPrice: number
}

const PlaceOrder = ({
  orderItems,
  address,
  paymentMethod,
  totalPrice,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateStock = () => {
    orderItems.forEach((item) => updateProduct(item._id, item.quantity))
  }

  const placeOrder = async () => {
    setLoading(true)

    const order = await createOrder({
      orderItems,
      address,
      paymentMethod,
      totalPrice,
    })

    if (!order) {
      setLoading(false)
      return
    }

    updateStock()
    clearCart()
    router.push(`/order/${order._id}`)
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
