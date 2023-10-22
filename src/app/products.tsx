import { HomeQueryParams } from 'types/params'
import { getProducts } from '@api/products/getProducts'
import { SearchFailText, ProductContainer } from './styles'
import Product from '@components/product/Product'
import Pagination from '@components/pagination/Pagination'

type Props = {
  searchParams: HomeQueryParams
}

const Products = async ({ searchParams }: Props) => {
  const { products, pages } = await getProducts(searchParams)

  return searchParams.search && products.length === 0 ? (
    <SearchFailText data-testid='search-fail-text'>
      No products matched your search term
    </SearchFailText>
  ) : (
    <>
      <ProductContainer aria-label='product list'>
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </ProductContainer>
      <Pagination pages={pages} />
    </>
  )
}

export default Products
