import { CreateOrderParams } from '@/types/params'
import { Order } from '@/types/api'
import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

export const createOrder = async (order: CreateOrderParams) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    return alert(response.statusText)
  }

  const data: Order = await response.json()
  return data
}
