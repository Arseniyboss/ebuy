import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { verifyStripeCheckoutSession } from '@auth/verifyStripeCheckoutSession'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/api/throwError'
import { getCurrentDate } from '@utils/getters/getCurrentDate'
import { getDeliveryDate } from '@utils/getters/getDeliveryDate'
import Order from '@models/order'
import User from '@models/user'

export const PUT = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const session = await verifyStripeCheckoutSession(request)
  const decoded = await decodeToken(request)
  const user = await User.findById(decoded?.id)
  const order = await Order.findById(params.id)

  if (!user && !session) {
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
