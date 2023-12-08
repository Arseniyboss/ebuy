import { HomeQueryParams } from '@/types/params'
import { GetProductsData as Data } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const getProducts = async ({
  page = 1,
  search = '',
  sort = 'createdAt.desc',
}: HomeQueryParams) => {
  return fetchData<Data>(`/products?page=${page}&search=${search}&sort=${sort}`)
}
