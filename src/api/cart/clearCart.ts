import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const clearCart = async () => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
