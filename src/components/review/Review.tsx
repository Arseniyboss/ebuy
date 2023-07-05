import { Review as Props } from 'types/api'
import { formatReviewDate } from '@utils/formatReviewDate'
import { ReviewContainer, Comment } from './styles'
import Rating from '@components/rating/Rating'

const Review = ({ name, comment, rating, createdAt }: Props) => {
  return (
    <ReviewContainer data-testid='review'>
      <p data-testid='review-name'>{name}</p>
      <Rating value={rating} />
      <p data-testid='review-date'>{formatReviewDate(createdAt)}</p>
      {comment && <Comment data-testid='review-comment'>{comment}</Comment>}
    </ReviewContainer>
  )
}

export default Review
