import { notFound } from 'next/navigation'
import { getProductById } from '@api/products/getProductById'
import { FlexGroup } from '@components/product/styles'
import {
  ProductContainer,
  ProductGroup,
  ProductImage,
  ProductDetails,
  ProductDescription,
  ProductSummary,
  ProductQuantity,
  ProductButton,
} from './styles'
import Rating from '@components/rating/Rating'

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
      <ProductGroup>
        <ProductImage
          src={product.image}
          alt=''
          width={250}
          height={250}
          priority
        />
        <ProductDetails>
          <h1>{product.name}</h1>
          <FlexGroup>
            <Rating value={product.rating} />
            <p>
              {product.numReviews}{' '}
              {product.numReviews === 1 ? 'review' : 'reviews'}
            </p>
          </FlexGroup>
          <ProductDescription>{product.description}</ProductDescription>
        </ProductDetails>
      </ProductGroup>
      <ProductSummary>
        <table>
          <tbody>
            <tr>
              <th>Price</th>
              <td>${product.price}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>
                <ProductQuantity>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </ProductQuantity>
              </td>
            </tr>
          </tbody>
        </table>
        <ProductButton disabled={product.countInStock === 0}>
          Add To Cart
        </ProductButton>
      </ProductSummary>
    </ProductContainer>
  )
}

export default Product
