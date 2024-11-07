import { CartItem } from '@/types/api'
import { CartAction } from '@/types/actions'

export const cartReducer = (cartItems: CartItem[], action: CartAction) => {
  switch (action.type) {
    case 'DELETE_ITEM':
      return cartItems.filter((cartItem) => cartItem._id !== action.id)
    case 'UPDATE_ITEM':
      return cartItems.map((cartItem) => {
        const { id, quantity } = action
        return cartItem._id === id ? { ...cartItem, quantity } : cartItem
      })
    default:
      return cartItems
  }
}
