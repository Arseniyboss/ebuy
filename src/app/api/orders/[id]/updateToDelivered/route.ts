import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import { getCurrentDate } from '@utils/getCurrentDate'
import Order from '@models/order'
import User from '@models/user'

export const PUT = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)
  const order = await Order.findById(params.id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!user.isAdmin) {
    return throwError({ error: 'Not authorized', status: 401 })
  }

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  order.isDelivered = true
  order.deliveredAt = getCurrentDate()
  order.deliveryDate = undefined

  await order.save()

  return NextResponse.json(null)
}
