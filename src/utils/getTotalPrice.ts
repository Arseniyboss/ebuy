import { CartItem } from 'types/api'
import { formatPrice } from './formatPrice'

export const getTotalPrice = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0)
  return formatPrice(totalPrice)
}
