import { QueryParams } from 'types/params'
import { Product } from 'types/product'
import { BASE_URL } from '@baseUrl'

type Data = {
  products: Product[]
  pages: number
}

export const getProducts = async ({
  page = 1,
  search = '',
  sort = 'createdAt.desc',
}: QueryParams) => {
  const url = `${BASE_URL}/api/products?page=${page}&search=${search}&sort=${sort}`
  const response = await fetch(url, { next: { tags: ['products'] } })
  const { products, pages }: Data = await response.json()
  return { products, pages }
}
