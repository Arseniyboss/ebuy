import { fetchData } from '@/utils/api/fetchData'

export const updateOrderToDelivered = async (orderId: string) => {
  return fetchData(`/orders/${orderId}/updateToDelivered`, { method: 'PUT' })
}
