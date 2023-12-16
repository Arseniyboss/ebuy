import { PaymentMethod } from '@/types/user'
import { fetchData } from '@/utils/api/fetchData'

export const setPaymentMethod = async (paymentMethod: PaymentMethod) => {
  return fetchData('/checkout/payment', {
    method: 'PUT',
    body: paymentMethod,
  })
}
