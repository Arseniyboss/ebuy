import { Product as Props } from 'types/product'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductPrice,
  FlexGroup,
} from './styles'
import Rating from '@components/rating/Rating'

const Product = ({ name, image, price, rating, numReviews }: Props) => {
  return (
    <ProductContainer>
      <ProductImage src={image} height={250} width={250} alt='' priority />
      <ProductDetails>
        <h1>{name}</h1>
        <ProductPrice>${price}</ProductPrice>
        <FlexGroup>
          <Rating value={rating} />
          <p>
            {numReviews} {numReviews === 1 ? 'review' : 'reviews'}
          </p>
        </FlexGroup>
      </ProductDetails>
    </ProductContainer>
  )
}

export default Product
