import { GetUserOrdersData as Data } from 'types/api'
import { UserOrdersQueryParams } from 'types/params'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const getUserOrders = async ({
  page = 1,
  status = '',
}: UserOrdersQueryParams) => {
  const url = `${BASE_URL}/api/orders?page=${page}&status=${status}`
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
