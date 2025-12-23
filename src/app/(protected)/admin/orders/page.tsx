import { Suspense } from 'react'
import { Metadata } from 'next'
import { OrdersQueryParams as QueryParams } from '@/types/params'
import { OrdersStatus } from '@/types/order'
import { Heading } from '@/styles/globals'
import Spinner from '@/components/feedback/spinner/Spinner'
import OrderFilter from '@/components/order/filter/OrderFilter'
import Orders from './orders'

type Props = {
  searchParams: Promise<QueryParams>
}

type Status = {
  name: OrdersStatus
  label: string
}

const statuses: Status[] = [
  {
    name: 'not-delivered',
    label: 'Not Delivered',
  },
]

export const metadata: Metadata = {
  title: 'Orders',
}

const OrdersPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams
  const suspenseKey = JSON.stringify(resolvedParams)
  return (
    <>
      <Heading>Orders</Heading>
      <OrderFilter statuses={statuses} />
      <Suspense key={suspenseKey} fallback={<Spinner variant="rainbow" />}>
        <Orders searchParams={resolvedParams} />
      </Suspense>
    </>
  )
}

export default OrdersPage
