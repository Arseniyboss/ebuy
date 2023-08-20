import { CartItem } from 'types/api'
import { formatPrice } from '../formatters/formatPrice'

export const getTotalPrice = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price
  }, 0)
  return formatPrice(totalPrice)
}
