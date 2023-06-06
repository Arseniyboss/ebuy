import { QueryParams } from 'types/queryParams'
import { Product as ProductType } from 'types/product'
import { getProducts } from '@api/products/getProducts'
import { SearchFailText, ProductContainer } from './styles'
import Product from '@components/product/Product'
import Pagination from '@components/pagination/Pagination'

type Props = {
  searchParams: QueryParams
}

const Products = async ({ searchParams }: Props) => {
  const { products, pages } = await getProducts(searchParams)
  return (
    <>
      {searchParams.search && products.length === 0 && (
        <SearchFailText>No products matched your search term</SearchFailText>
      )}
      {products.length > 0 && (
        <>
          <ProductContainer>
            {products.map((product: ProductType) => (
              <Product key={product._id} {...product} />
            ))}
          </ProductContainer>
          <Pagination pages={pages} />
        </>
      )}
    </>
  )
}

export default Products as unknown as ({ searchParams }: Props) => JSX.Element
