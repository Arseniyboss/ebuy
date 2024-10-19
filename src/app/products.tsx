import { HomeQueryParams } from '@/types/params'
import { getProducts } from '@/api/products/getProducts'
import { ProductWrapper } from './styles'
import Message from '@/components/feedback/message/Message'
import Product from '@/components/product/Product'
import Pagination from '@/components/pagination/Pagination'

type Props = {
  searchParams: HomeQueryParams
}

const Products = async ({ searchParams }: Props) => {
  const { data, error } = await getProducts(searchParams)

  if (error) {
    return <Message variant='error'>{error}</Message>
  }

  if (!data) {
    return <Message variant='error'>Products not found</Message>
  }

  const { products, pages } = data
  return (
    <>
      {searchParams.search && products.length === 0 && (
        <p className='text-center' data-testid='search-fail-text'>
          No products matched your search term
        </p>
      )}
      {products.length > 0 && (
        <>
          <ProductWrapper aria-label='product list'>
            {products.map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </ProductWrapper>
          <Pagination pages={pages} />
        </>
      )}
    </>
  )
}

export default Products
