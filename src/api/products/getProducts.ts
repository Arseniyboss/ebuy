import { QueryParams } from 'types/queryParams'
import { Product } from 'types/product'
import { BASE_URL } from '@baseUrl'

export const getProducts = async ({
  searchTerm = '',
  sort = 'createdAt.desc',
}: QueryParams) => {
  const url = `${BASE_URL}/api/products?searchTerm=${searchTerm}&sort=${sort}`
  const response = await fetch(url, { next: { tags: ['products'] } })
  // for testing
  // const response = await fetch(url, { cache: 'no-cache' })
  const products: Product[] = await response.json()
  return products
}
