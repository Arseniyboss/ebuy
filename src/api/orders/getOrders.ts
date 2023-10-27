import { GetOrdersData as Data } from '@/types/api'
import { OrdersQueryParams as QueryParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

export const getOrders = async ({ page = 1, status = '' }: QueryParams) => {
  const url = `${BASE_URL}/api/admin/orders?page=${page}&status=${status}`
  const token = await getToken()

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) return

  const { orders, pages }: Data = await response.json()
  return { orders, pages }
}
