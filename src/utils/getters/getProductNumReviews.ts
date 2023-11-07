export const getProductNumReviews = (numReviews: number) => {
  return `${numReviews} ${numReviews === 1 ? 'review' : 'reviews'}`
}
