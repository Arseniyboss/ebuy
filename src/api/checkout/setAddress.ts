import { Address } from 'types/base/user'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/token/getters/getToken'

export const setAddress = async (address: Address) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/checkout/address`, {
    method: 'PUT',
    body: JSON.stringify(address),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
