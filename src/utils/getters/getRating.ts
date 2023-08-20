import { Reviews } from 'types/mongo/models'

export const getRating = (reviews: Reviews) => {
  return reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
}
