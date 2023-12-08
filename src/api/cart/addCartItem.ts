import { CartItem } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const addCartItem = async (cartItem: CartItem) => {
  return fetchData('/cart', { method: 'POST', body: cartItem })
}
