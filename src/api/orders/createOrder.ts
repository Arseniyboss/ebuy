import { CreateOrderParams } from '@/types/params'
import { Order } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const createOrder = async (order: CreateOrderParams) => {
  return fetchData<Order>('/orders', { method: 'POST', body: order })
}
