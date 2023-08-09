import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import { getCurrentDate } from '@utils/getCurrentDate'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import Order from '@models/order'

export const PUT = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const order = await Order.findById(params.id)

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  order.isPaid = true
  order.paidAt = getCurrentDate()
  order.deliveryDate = getDeliveryDate()

  await order.save()

  return NextResponse.json(null)
}
