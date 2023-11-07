import { Fragment } from 'react'
import { Star } from './styles'
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti'

type Props = {
  value: number
}

const Rating = ({ value }: Props) => {
  return (
    <Star
      role='img'
      aria-label={`rating ${parseFloat(value.toFixed(1))} out of 5 stars`}
    >
      {[...new Array(5)].map((_, index) => (
        <Fragment key={index}>
          {value >= index + 1 ? (
            <TiStarFullOutline aria-hidden />
          ) : value >= index + 0.5 ? (
            <TiStarHalfOutline aria-hidden />
          ) : (
            <TiStarOutline aria-hidden />
          )}
        </Fragment>
      ))}
    </Star>
  )
}

export default Rating
