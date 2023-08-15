import { Suspense } from 'react'
import { HomeQueryParams } from 'types/params'
import { Heading } from '@styles/globals'
import { FlexGroup } from './styles'
import Search from '@components/search/Search'
import Sort from '@components/sort/Sort'
import SkeletonLoaders from './skeletons'
import Products from './products'

type Props = {
  searchParams: HomeQueryParams
}

const Home = ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Products</Heading>
      <FlexGroup>
        <Search />
        <Sort />
      </FlexGroup>
      <Suspense fallback={<SkeletonLoaders />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default Home
