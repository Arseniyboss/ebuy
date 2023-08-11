import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const updateOrderToDelivered = async (orderId: string) => {
  const url = `${BASE_URL}/api/orders/${orderId}/updateToDelivered`
  const token = await getToken()

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
