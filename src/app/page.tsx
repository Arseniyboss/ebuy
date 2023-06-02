import { Suspense } from 'react'
import { QueryParams } from 'types/queryParams'
import { Heading } from '@styles/globals'
import { FlexContainer } from './styles'
import Search from '@components/search/Search'
import Sort from '@components/sort/Sort'
import SkeletonLoaders from './skeletons'
import Products from './products'

type Props = {
  searchParams: QueryParams
}

const Home = ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Products</Heading>
      <FlexContainer>
        <Search />
        <Sort />
      </FlexContainer>
      <Suspense fallback={<SkeletonLoaders />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default Home
