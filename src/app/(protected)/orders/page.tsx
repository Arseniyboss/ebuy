import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserOrdersQueryParams as QueryParams } from '@/types/params'
import { Heading } from '@/styles/globals'
import Spinner from '@/components/feedback/spinner/Spinner'
import UserOrders from './orders'

type Props = {
  searchParams: Promise<QueryParams>
}

export const metadata: Metadata = {
  title: 'Orders',
}

const UserOrdersPage = async ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Orders</Heading>
      <Suspense fallback={<Spinner variant="stripe" />}>
        <UserOrders searchParams={await searchParams} />
      </Suspense>
    </>
  )
}

export default UserOrdersPage
