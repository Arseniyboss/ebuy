import { NextResponse } from 'next/server'
import { withAdminAuth } from '@/middleware/api/dynamicHandler/withAdminAuth'
import { throwError } from '@/utils/api/throwError'
import { getCurrentDate } from '@/utils/getters/getCurrentDate'
import Order from '@/models/order'

export const PUT = withAdminAuth(async ({ params }) => {
  const { id } = await params
  const order = await Order.findById(id)

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  order.isDelivered = true
  order.deliveredAt = getCurrentDate()
  order.deliveryDate = undefined

  await order.save()

  return NextResponse.json(null)
})
