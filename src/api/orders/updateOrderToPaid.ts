import { BASE_URL } from '@baseUrl'

export const updateOrderToPaid = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/orders/${id}/updateToPaid`, {
    method: 'PUT',
  })

  if (!response.ok) {
    return alert(response.statusText)
  }

  return response
}
