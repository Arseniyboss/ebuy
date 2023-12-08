import { fetchData } from '@/utils/api/fetchData'

export const updateCartItem = async (id: string, quantity: number) => {
  return fetchData(`/cart/${id}`, { method: 'PATCH', body: quantity })
}
