import { notFound } from 'next/navigation'
import { getProductById } from '@api/products/getProductById'
import { FlexGroup } from '@components/product/styles'
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductName,
} from './styles'
import Rating from '@components/rating/Rating'
import AddToCart from './AddToCart'

export type Params = {
  params: {
    id: string
  }
}

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
        width={440}
        height={350}
        priority
      />
      <ProductDetails>
        <ProductName>{product.name}</ProductName>
        <h2>${product.price}</h2>
        <FlexGroup>
          <Rating value={product.rating} />
          <p>{product.numReviews}</p>
          <p>{product.numReviews === 1 ? 'review' : 'reviews'}</p>
        </FlexGroup>
        <p>{product.description}</p>
        <AddToCart product={product} />
      </ProductDetails>
    </ProductContainer>
  )
}

export default Product
