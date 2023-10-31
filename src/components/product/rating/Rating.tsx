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
    <Star aria-label={`${parseFloat(value.toFixed(1))} star rating`}>
      {[...new Array(5)].map((_, index) => (
        <li key={index}>
          {value >= index + 1 ? (
            <TiStarFullOutline />
          ) : value >= index + 0.5 ? (
            <TiStarHalfOutline />
          ) : (
            <TiStarOutline />
          )}
        </li>
      ))}
    </Star>
  )
}

export default Rating
