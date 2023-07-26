import { PaymentMethod } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const addPaymentMethod = async (paymentMethod: PaymentMethod) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/checkout/paymentMethod`, {
    method: 'PUT',
    body: paymentMethod,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
