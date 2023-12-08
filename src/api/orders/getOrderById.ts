import { Order } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const getOrderById = async (id: string) => {
  return fetchData<Order>(`/orders/${id}`, { tags: ['order'] })
}
