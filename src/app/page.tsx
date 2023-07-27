import { Suspense } from 'react'
import { Metadata } from 'next'
import { QueryParams } from 'types/params'
import { Heading } from '@styles/globals'
import { FlexGroup } from './styles'
import Search from '@components/search/Search'
import Sort from '@components/sort/Sort'
import SkeletonLoaders from './skeletons'
import Products from './products'

export const metadata: Metadata = {
  title: 'Ebuy',
  description: 'Buy high quality products by cheapest prices',
}

type Props = {
  searchParams: QueryParams
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
