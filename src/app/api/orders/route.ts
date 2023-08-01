import { NextRequest, NextResponse } from 'next/server'
import { CreateOrderParams as Body } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import User from '@models/user'
import Order from '@models/order'

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
