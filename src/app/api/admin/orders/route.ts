import { NextResponse } from 'next/server'
import { OrdersStatus } from '@/types/order'
import { withAdminAuth } from '@/utils/api/withAuth/admin'
import { getSearchParams } from '@/utils/getters/getSearchParams'
import { getValidPage } from '@/utils/api/validateQueryParams'
import Order from '@/models/order'

export const GET = withAdminAuth(async ({ request }) => {
  const status = getSearchParams(request, 'status') as OrdersStatus

  const filters = {
    isPaid: true,
    isDelivered: false,
  }

  const filterQuery = status === 'not-delivered' ? filters : {}

  const ordersPerPage = 2
  const numberOfOrders = await Order.countDocuments(filterQuery)
  const pages = Math.ceil(numberOfOrders / ordersPerPage)
  const page = getValidPage(Number(getSearchParams(request, 'page')), pages)
  const prevPageOrders = ordersPerPage * (page - 1)

  const orders = await Order.find(filterQuery)
    .limit(ordersPerPage)
    .skip(prevPageOrders)

  return NextResponse.json({ orders, pages })
})
