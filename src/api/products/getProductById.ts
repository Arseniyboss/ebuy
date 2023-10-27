import { Product } from '@/types/api'
import { BASE_URL } from '@/baseUrl'

export const getProductById = async (id: string) => {
  const url = `${BASE_URL}/api/products/${id}`
  const response = await fetch(url, { next: { tags: ['product'] } })

  if (!response.ok) return

  const product: Product = await response.json()
  return product
}
