import { ProductContainer } from './styles'
import SkeletonLoader from '@components/product/skeleton/SkeletonLoader'

const SkeletonLoaders = () => {
  return (
    <ProductContainer>
      {[...new Array(4)].map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </ProductContainer>
  )
}

export default SkeletonLoaders
