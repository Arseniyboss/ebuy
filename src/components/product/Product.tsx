import { Product as Props } from 'types/product'
import {
  ProductLink,
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductPrice,
  FlexGroup,
} from './styles'
import Rating from '@components/rating/Rating'

const Product = ({ _id, name, image, price, rating, numReviews }: Props) => {
  return (
    <ProductLink href={`/product/${_id}`} data-testid='product-link'>
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
    </ProductLink>
  )
}

export default Product
