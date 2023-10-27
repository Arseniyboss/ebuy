import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

export const updateProduct = async (id: string, quantity: number) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ id, quantity }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
