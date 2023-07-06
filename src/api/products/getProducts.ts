import { QueryParams } from 'types/params'
import { GetProductsData as Data } from 'types/api'
import { BASE_URL } from '@baseUrl'

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
