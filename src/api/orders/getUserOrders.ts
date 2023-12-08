import { GetOrdersData as Data } from '@/types/api'
import { UserOrdersQueryParams as QueryParams } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const getUserOrders = async ({ page = 1, status = '' }: QueryParams) => {
  return fetchData<Data>(`/orders?page=${page}&status=${status}`)
}
