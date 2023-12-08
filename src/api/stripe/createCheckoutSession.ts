import { CartItem } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const createCheckoutSession = async (
  orderItems: CartItem[],
  orderId: string
) => {
  return fetchData<string>('/stripe/checkout', {
    method: 'POST',
    body: { orderItems, orderId },
  })
}
