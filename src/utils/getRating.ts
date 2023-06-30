import { Review } from 'types/product'

export const getRating = (reviews: Review[]) => {
  return reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
}
