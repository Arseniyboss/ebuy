import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserOrdersQueryParams } from 'types/params'
import { Heading } from '@styles/globals'
import Spinner from '@components/loader/spinner/Spinner'
import Orders from './orders'

type Props = {
  searchParams: UserOrdersQueryParams
}

export const metadata: Metadata = {
  title: 'Orders',
}

const OrdersPage = async ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Orders</Heading>
      <Suspense fallback={<Spinner variant='stripe' />}>
        <Orders searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default OrdersPage
