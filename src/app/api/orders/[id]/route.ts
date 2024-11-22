import { NextResponse } from 'next/server'
import { withAuth } from '@/middleware/api/dynamicHandler/withAuth'
import { throwError } from '@/utils/api/throwError'
import Order from '@/models/order'

export const GET = withAuth(async ({ user, params }) => {
  const { id } = await params
  const order = await Order.findById(id)

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  if (!user.isAdmin && order.userId.toString() !== user.id) {
    return throwError({ error: 'Not authorized', status: 401 })
  }

  return NextResponse.json(order)
})
