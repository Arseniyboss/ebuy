import { PaymentMethod } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const setPaymentMethod = async (paymentMethod: PaymentMethod) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/checkout/payment`, {
    method: 'PUT',
    body: JSON.stringify(paymentMethod),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
