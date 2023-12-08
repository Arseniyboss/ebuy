import { fetchData } from '@/utils/api/fetchData'

export const clearCart = async () => {
  return fetchData('/cart', { method: 'DELETE' })
}
