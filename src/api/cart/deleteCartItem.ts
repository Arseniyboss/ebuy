import { fetchData } from '@/utils/api/fetchData'

export const deleteCartItem = async (id: string) => {
  return fetchData(`/cart/${id}`, { method: 'DELETE' })
}
