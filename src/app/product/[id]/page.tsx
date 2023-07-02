import { notFound } from 'next/navigation'
import { Params } from 'types/params'
import { getProductById } from '@api/products/getProductById'
import { FlexGroup } from '@components/product/styles'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductName,
  ReviewContainer,
} from './styles'
import Rating from '@components/rating/Rating'
import AddToCart from './AddToCart'
import Message from '@components/message/Message'
import Review from '@components/review/Review'

export const generateMetadata = async ({ params }: Params) => {
  const product = await getProductById(params.id)
  return { title: product ? product.name : 'Not Found' }
}

const Product = async ({ params }: Params) => {
  const product = await getProductById(params.id)

  if (!product) {
    return notFound()
  }

  return (
    <ProductContainer>
      <ProductImage
        src={product.image}
        alt=''
        width={448}
        height={357}
        priority
        data-testid='product-image'
      />
      <ProductDetails>
        <ProductName data-testid='product-name'>{product.name}</ProductName>
        <h2 data-testid='product-price'>${product.price}</h2>
        <FlexGroup>
          <Rating value={product.rating} />
          <p>{product.numReviews}</p>
          <p>{product.numReviews === 1 ? 'review' : 'reviews'}</p>
        </FlexGroup>
        <p data-testid='product-description'>{product.description}</p>
        <AddToCart product={product} />
      </ProductDetails>
      <ReviewContainer>
        <h2>Reviews</h2>
        {product.reviews.length === 0 ? (
          <Message variant='info'>No Reviews</Message>
        ) : (
          product.reviews.map((review) => (
            <Review key={review._id} {...review} />
          ))
        )}
      </ReviewContainer>
    </ProductContainer>
  )
}

export default Product
