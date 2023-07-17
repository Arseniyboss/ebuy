import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const deleteCartItem = async (id: string) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/cart/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
