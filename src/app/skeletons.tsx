import { ProductContainer } from './styles'
import SkeletonLoader from '@components/loader/skeleton/SkeletonLoader'

const SkeletonLoaders = () => {
  return (
    <ProductContainer>
      {[...new Array(6)].map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </ProductContainer>
  )
}

export default SkeletonLoaders
