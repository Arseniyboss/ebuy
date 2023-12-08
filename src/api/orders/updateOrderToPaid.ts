import { fetchData } from '@/utils/api/fetchData'

export const updateOrderToPaid = async (
  orderId: string,
  stripeSessionId?: string
) => {
  return fetchData(`/orders/${orderId}/updateToPaid`, {
    method: 'PUT',
    stripeSessionId,
  })
}
