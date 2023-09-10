import { Suspense } from 'react'
import { Metadata } from 'next'
import { OrdersQueryParams as QueryParams } from 'types/params'
import { Heading } from '@styles/globals'
import Spinner from '@components/feedback/spinner/Spinner'
import Orders from './orders'

type Props = {
  searchParams: QueryParams
}

export const metadata: Metadata = {
  title: 'Orders',
}

const OrdersPage = async ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Orders</Heading>
      <Suspense fallback={<Spinner variant='rainbow' />}>
        <Orders searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default OrdersPage
