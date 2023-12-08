import { Product } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const getProductById = async (id: string) => {
  return fetchData<Product>(`/products/${id}`, { tags: ['product'] })
}
