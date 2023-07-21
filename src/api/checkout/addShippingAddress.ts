import { ShippingAddress } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const addShippingAddress = async (shippingAddress: ShippingAddress) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/checkout/shippingAddress`, {
    method: 'PUT',
    body: JSON.stringify(shippingAddress),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
