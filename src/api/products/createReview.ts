import { CreateReviewParams as Review } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

export const createReview = async (productId: string, review: Review) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/products/${productId}/review`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
