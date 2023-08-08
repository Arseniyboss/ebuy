import { CartItem } from 'types/api'
import { BASE_URL } from '@baseUrl'

export const createCheckoutSession = async (orderItems: CartItem[]) => {
  const response = await fetch(`${BASE_URL}/api/stripe/checkout`, {
    method: 'POST',
    body: JSON.stringify(orderItems),
  })

  if (!response.ok) {
    return alert(response.statusText)
  }

  const sessionUrl: string = await response.json()
  return sessionUrl
}
