import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import Order from '@/models/order'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const user = await getUser(request)
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
