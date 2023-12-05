import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { verifyStripeCheckoutSession } from '@/auth/verifyStripeCheckoutSession'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import { getCurrentDate } from '@/utils/getters/getCurrentDate'
import { getDeliveryDate } from '@/utils/getters/getDeliveryDate'
import Order from '@/models/order'

export const PUT = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const stripeSession = await verifyStripeCheckoutSession(request)
  const user = await getUser(request)
  const order = await Order.findById(params.id)

  if (!user && !stripeSession) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  order.isPaid = true
  order.paidAt = getCurrentDate()
  order.deliveryDate = getDeliveryDate()

  await order.save()

  return NextResponse.json(null)
}
