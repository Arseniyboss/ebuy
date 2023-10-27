import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

export const updateOrderToPaid = async (
  orderId: string,
  sessionId?: string
) => {
  const url = `${BASE_URL}/api/orders/${orderId}/updateToPaid`
  const token = await getToken()

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token || sessionId}`,
    },
  })

  if (!response.ok) {
    return alert(response.statusText)
  }

  return response
}
