import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const updateCartItem = async (id: string, quantity: number) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/cart/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(quantity),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
