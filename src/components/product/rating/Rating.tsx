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
    <Star aria-label={`${value} stars`}>
      {[...new Array(5)].map((_, index) => (
        <Fragment key={index}>
          {value >= index + 1 ? (
            <TiStarFullOutline />
          ) : value >= index + 0.5 ? (
            <TiStarHalfOutline />
          ) : (
            <TiStarOutline />
          )}
        </Fragment>
      ))}
    </Star>
  )
}

export default Rating
