import { fetchData } from '@/utils/api/fetchData'

export const updateStock = async (id: string, quantity: number) => {
  return fetchData(`/products/${id}`, {
    method: 'PATCH',
    body: { id, quantity },
  })
}
