import { NextRequest, NextResponse } from 'next/server'
import { OrdersStatus } from '@/types/base/order'
import { connectToDB } from '@/config/mongodb'
import { decodeToken } from '@/auth/token/decode/requestHeaders'
import { throwError } from '@/utils/api/throwError'
import { getSearchParams } from '@/utils/getters/getSearchParams'
import { getValidPage } from '@/utils/api/validateQueryParams'
import User from '@/models/user'
import Order from '@/models/order'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const session = await decodeToken(request)
  const user = await User.findById(session?.user.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!user.isAdmin) {
    return throwError({ error: 'Not authorized', status: 401 })
  }

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
}
