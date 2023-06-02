import { QueryParams } from 'types/queryParams'
import { Product as ProductType } from 'types/product'
import { getProducts } from '@api/products/getProducts'
import { SearchFailText, ProductContainer } from './styles'
import Product from '@components/product/Product'

type Props = {
  searchParams: QueryParams
}

const Products = async ({ searchParams }: Props) => {
  const products = await getProducts(searchParams)
  return (
    <>
      {products.length === 0 ? (
        <SearchFailText>No products matched your search term</SearchFailText>
      ) : (
        <ProductContainer>
          {products.map((product: ProductType) => (
            <Product key={product._id} {...product} />
          ))}
        </ProductContainer>
      )}
    </>
  )
}

export default Products as unknown as ({ searchParams }: Props) => JSX.Element
