import { Product as Props } from '@/types/api'
import { generateBlurDataURL } from '@/utils/api/generateBlurDataURL'
import { getProductNumReviews } from '@/utils/getters/getProductNumReviews'
import { FlexGroup, ProductPrice } from '@/styles/globals'
import { ProductLink, ProductContainer, ProductImage, ProductDetails } from './styles'
import Rating from '@/components/product/rating/Rating'

const Product = async ({ _id, name, image, price, rating, numReviews }: Props) => {
  const blurDataURL = await generateBlurDataURL(image)
  return (
    <ProductLink href={`/product/${_id}`} data-testid="product-link">
      <ProductContainer data-testid="product">
        <ProductImage
          src={image}
          height={255}
          width={320}
          alt=""
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
          data-testid="product-image"
        />
        <ProductDetails>
          <h2 data-testid="product-name">{name}</h2>
          <ProductPrice data-testid="product-price">${price}</ProductPrice>
          <FlexGroup>
            <Rating value={rating} />
            <p>{getProductNumReviews(numReviews)}</p>
          </FlexGroup>
        </ProductDetails>
      </ProductContainer>
    </ProductLink>
  )
}

export default Product
