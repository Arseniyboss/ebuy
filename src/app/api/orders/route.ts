import { NextResponse } from 'next/server'
import { CreateOrderParams as Body } from '@/types/params'
import { UserOrdersStatus } from '@/types/order'
import { withAuth } from '@/middleware/api/withAuth'
import { getSearchParams } from '@/utils/getters/getSearchParams'
import { getValidPage } from '@/utils/api/validateQueryParams'
import Order from '@/models/order'

export const GET = withAuth(async ({ request, user }) => {
  const status = getSearchParams(request, 'status') as UserOrdersStatus

  const filters = {
    userId: user._id.toString(),
    isPaid: false,
  }

  const filterQuery = status === 'not-paid' ? filters : { userId: user._id.toString() }

  const ordersPerPage = 2
  const numberOfOrders = await Order.countDocuments(filterQuery)
  const pages = Math.ceil(numberOfOrders / ordersPerPage)
  const page = getValidPage(Number(getSearchParams(request, 'page')), pages)
  const prevPageOrders = ordersPerPage * (page - 1)

  const orders = await Order.find(filterQuery).limit(ordersPerPage).skip(prevPageOrders)

  return NextResponse.json({ orders, pages })
})

export const POST = withAuth(async ({ request, user }) => {
  const body: Body = await request.json()
  const order = await Order.create({ ...body, userId: user._id.toString() })
  return NextResponse.json(order, { status: 201 })
})
