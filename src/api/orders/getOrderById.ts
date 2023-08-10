import { Order } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const getOrderById = async (id: string) => {
  const url = `${BASE_URL}/api/orders/${id}`
  const token = await getToken()

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['order'],
    },
  })

  if (!response.ok) return

  const order: Order = await response.json()
  return order
}
