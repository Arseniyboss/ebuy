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
    <ProductContainer data-testid='product'>
      <ProductImage src={image} height={250} width={250} alt='' priority />
      <ProductDetails>
        <h1 data-testid='product-name'>{name}</h1>
        <ProductPrice data-testid='product-price'>${price}</ProductPrice>
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
