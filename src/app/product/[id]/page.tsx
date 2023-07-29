import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageParams } from 'types/params'
import { getProductById } from '@api/products/getProductById'
import { decodeToken } from '@auth/decodeToken/cookies'
import { FlexGroup } from '@styles/globals'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductReviews,
} from './styles'
import Rating from '@components/rating/Rating'
import AddToCart from './AddToCart'
import Message from '@components/message/Message'
import Review from '@components/review/Review'
import ReviewForm from './ReviewForm'

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const product = await getProductById(params.id)
  return { title: product ? product.name : 'Not Found' }
}

const Product = async ({ params }: PageParams) => {
  const product = await getProductById(params.id)
  const user = await decodeToken()

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
        <AddToCart product={product} user={user} />
      </ProductDetails>
      <ProductReviews>
        <h2>Reviews</h2>
        {product.reviews.length === 0 ? (
          <Message variant='info'>No Reviews</Message>
        ) : (
          product.reviews.map((review) => (
            <Review key={review.userId} {...review} />
          ))
        )}
        {!user ? (
          <Message variant='info'>Please sign in to write a review</Message>
        ) : (
          <ReviewForm params={params} />
        )}
      </ProductReviews>
    </ProductContainer>
  )
}

export default Product
