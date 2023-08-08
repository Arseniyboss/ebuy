import { CartItem } from 'types/api'
import { convertToCents } from './convertToCents'

export const getStripeItems = (orderItems: CartItem[]) => {
  return orderItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: convertToCents(item.price),
      },
      quantity: item.quantity,
    }
  })
}
