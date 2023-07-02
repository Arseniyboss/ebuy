import { Review as Props } from 'types/api'

const Review = ({ name, comment, rating }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>{comment}</p>
      <p>{rating}</p>
    </div>
  )
}

export default Review
