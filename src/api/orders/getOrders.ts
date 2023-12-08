import { GetOrdersData as Data } from '@/types/api'
import { OrdersQueryParams as QueryParams } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const getOrders = async ({ page = 1, status = '' }: QueryParams) => {
  return fetchData<Data>(`/admin/orders?page=${page}&status=${status}`)
}
