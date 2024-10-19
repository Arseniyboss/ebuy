import { ProductWrapper } from './styles'
import SkeletonLoader from '@/components/product/skeleton/SkeletonLoader'

const SkeletonLoaders = () => {
  return (
    <ProductWrapper>
      {[...new Array(4)].map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </ProductWrapper>
  )
}

export default SkeletonLoaders
