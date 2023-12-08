import { CreateReviewParams as Review } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const createReview = async (productId: string, review: Review) => {
  return fetchData(`/products/${productId}/review`, {
    method: 'POST',
    body: review,
  })
}
