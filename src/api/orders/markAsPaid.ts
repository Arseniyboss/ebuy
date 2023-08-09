import { BASE_URL } from '@baseUrl'

export const markAsPaid = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/orders/${id}/markAsPaid`, {
    method: 'PUT',
  })

  if (!response.ok) {
    return alert(response.statusText)
  }

  return response
}
