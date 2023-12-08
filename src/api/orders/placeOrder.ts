import { PlaceOrderParams } from '@/types/params'
import { updateStock } from '@/api/products/updateStock'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { createOrder } from './createOrder'
import { clearCart } from '@/api/cart/clearCart'

export const placeOrder = async (order: PlaceOrderParams) => {
  const updateStockErrors: string[] = []
  const orderItemsIds: string[] = []

  for (const item of order.orderItems) {
    const { error } = await updateStock(item._id, item.quantity)
    if (error) {
      orderItemsIds.push(item._id)
      updateStockErrors.push(error)
      alert(error)
    }
  }

  if (updateStockErrors.length === order.orderItems.length) {
    return { error: 'All order items are out of stock' }
  }

  const orderItems = order.orderItems.filter((item) => {
    return !orderItemsIds.includes(item._id)
  })

  const totalPrice = getTotalPrice(orderItems)

  const { data, error: createOrderError } = await createOrder({
    ...order,
    orderItems,
    totalPrice,
  })

  if (createOrderError) {
    return { error: createOrderError }
  }

  await clearCart()

  return { data }
}
