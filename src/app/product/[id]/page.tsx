import { Metadata } from 'next'
import { PageParams } from '@/types/params'
import { getProductById } from '@/api/products/getProductById'
import { generateBlurDataURL } from '@/utils/api/generateBlurDataURL'
import { getSession } from '@/auth/session/cookies'
import { getProductNumReviews } from '@/utils/getters/getProductNumReviews'
import { FlexGroup, ProductPrice } from '@/styles/globals'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductReviews,
} from './styles'
import Rating from '@/components/product/rating/Rating'
import AddToCart from './AddToCart'
import Message from '@/components/feedback/message/Message'
import Review from '@/components/product/review/Review'
import ReviewForm from './ReviewForm'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const { id } = await params
  const { data: product } = await getProductById(id)
  return { title: product ? product.name : 'Not Found' }
}

const Product = async ({ params }: PageParams) => {
  const { id } = await params
  const { data: product, error } = await getProductById(id)
  const session = await getSession()

  if (error) {
    return <Message variant="error">{error}</Message>
  }

  if (!product) {
    return <Message variant="error">Product not found</Message>
  }

  const blurDataURL = await generateBlurDataURL(product.image)
  return (
    <ProductContainer>
      <ProductImage
        src={product.image}
        alt=""
        width={448}
        height={357}
        priority
        placeholder="blur"
        blurDataURL={blurDataURL}
        data-testid="product-image"
      />
      <ProductDetails className="container" aria-label="product details">
        <ProductName data-testid="product-name">{product.name}</ProductName>
        <ProductPrice data-testid="product-price">${product.price}</ProductPrice>
        <FlexGroup>
          <Rating value={product.rating} />
          <p>{getProductNumReviews(product.numReviews)}</p>
        </FlexGroup>
        <p data-testid="product-description">{product.description}</p>
        <AddToCart product={product} user={session?.user} />
      </ProductDetails>
      <ProductReviews className="container" aria-labelledby="reviews">
        <h2 id="reviews">Reviews</h2>
        {product.reviews.length === 0 ? (
          <Message variant="info">No Reviews</Message>
        ) : (
          product.reviews.map((review) => <Review key={review.userId} {...review} />)
        )}
        {!session ? (
          <Message variant="info">Please sign in to write a review</Message>
        ) : (
          <ReviewForm params={params} />
        )}
      </ProductReviews>
    </ProductContainer>
  )
}

export default Product
