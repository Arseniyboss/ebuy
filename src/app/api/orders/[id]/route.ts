import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/api/throwError'
import User from '@models/user'
import Order from '@models/order'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)
  const order = await Order.findById(params.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  if (!user.isAdmin && order.userId.toString() !== user.id) {
    return throwError({ error: 'Not authorized', status: 401 })
  }

  return NextResponse.json(order)
}
