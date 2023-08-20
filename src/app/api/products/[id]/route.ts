import { NextResponse, NextRequest } from 'next/server'
import { PageParams, UpdateProductParams as Body } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/api/throwError'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import Product from '@models/product'
import User from '@models/user'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  return NextResponse.json(product)
}

export const PATCH = async (request: NextRequest) => {
  await connectToDB()

  const { id, quantity }: Body = await request.json()

  const decoded = await decodeToken(request)

  const user = await User.findById(decoded?.id)
  const product = await Product.findById(id)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  product.countInStock = product.countInStock - quantity

  await product.save()

  return NextResponse.json(null)
}
