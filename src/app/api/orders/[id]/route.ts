import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import Order from '@models/order'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const order = await Order.findById(params.id).populate('userId', [
    'name',
    'email',
  ])

  if (!order) {
    return throwError({ error: 'Order not found', status: 404 })
  }

  return NextResponse.json(order)
}
