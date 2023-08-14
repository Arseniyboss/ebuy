import { NextRequest, NextResponse } from 'next/server'
import { CreateOrderParams as Body } from 'types/params'
import { UserOrdersStatus } from 'types/order'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import { getSearchParams } from '@utils/getSearchParams'
import { getValidPage } from '@utils/validateQueryParams'
import User from '@models/user'
import Order from '@models/order'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const status = getSearchParams(request, 'status') as UserOrdersStatus

  const filters = {
    userId: user.id,
    isPaid: false,
  }

  const filterQuery = status === 'pay' ? filters : { userId: user.id }

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

export const POST = async (request: NextRequest) => {
  await connectToDB()

  const body: Body = await request.json()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const order = await Order.create({ ...body, userId: user.id })

  return NextResponse.json(order, { status: 201 })
}
