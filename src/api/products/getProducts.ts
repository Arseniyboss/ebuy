import { QueryParams } from 'types/queryParams'
import { Product } from 'types/product'
import { BASE_URL } from '@baseUrl'

type Data = {
  products: Product[]
  pages: number
}

export const getProducts = async ({
  page = 1,
  searchTerm = '',
  sort = 'createdAt.desc',
}: QueryParams) => {
  const url = `${BASE_URL}/api/products?page=${page}&searchTerm=${searchTerm}&sort=${sort}`
  const response = await fetch(url, { next: { tags: ['products'] } })
  // for testing
  // const response = await fetch(url, { cache: 'no-cache' })
  const { products, pages }: Data = await response.json()
  return { products, pages }
}
