import { Order } from 'types/api'
import { BASE_URL } from '@baseUrl'

export const getOrderById = async (id: string) => {
  const url = `${BASE_URL}/api/orders/${id}`
  const response = await fetch(url)

  if (!response.ok) return

  const order: Order = await response.json()
  return order
}
