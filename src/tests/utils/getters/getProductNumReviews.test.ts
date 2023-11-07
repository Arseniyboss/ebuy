import { getProductNumReviews } from '@/utils/getters/getProductNumReviews'

it('gets product num reviews', () => {
  expect(getProductNumReviews(0)).toBe('0 reviews')
  expect(getProductNumReviews(1)).toBe('1 review')
  expect(getProductNumReviews(2)).toBe('2 reviews')
})
