import { formatReviewDate } from '@/utils/formatters/formatReviewDate'

it('formats review date', () => {
  const reviewDate = '2022-05-15T17:26:12.607+00:00'
  const formattedReviewDate = formatReviewDate(reviewDate)
  expect(formattedReviewDate).toBe('15.05.2022')
})
