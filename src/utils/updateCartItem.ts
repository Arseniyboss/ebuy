import { CartItem } from 'types/product'
import { getCookie } from './cookie'

export const updateCartItem = (id: string, quantity: number) => {
  const cartItems = getCookie<CartItem[]>('cartItems')!
  const newItems = cartItems.map((item) =>
    item._id === id ? { ...item, quantity } : item
  )
  return newItems
}
