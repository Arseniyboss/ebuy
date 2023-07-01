import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'
import { Review } from 'types/product'

export const createReview = async (id: string, review: Review) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/products/${id}/review`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
