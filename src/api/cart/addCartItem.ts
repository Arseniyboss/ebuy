import { CartItem } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/token/getters/getToken'

export const addCartItem = async (cartItem: CartItem) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    body: JSON.stringify(cartItem),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
