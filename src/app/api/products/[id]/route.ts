import { NextResponse, NextRequest } from 'next/server'
import { PageParams, UpdateProductParams as Body } from '@/types/params'
import { connectToDB } from '@/database/mongoDB'
import { withAuth } from '@/utils/api/withAuth'
import { throwError } from '@/utils/api/throwError'
import Product from '@/models/product'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  return NextResponse.json(product)
}

export const PATCH = withAuth(async ({ request }) => {
  const { id, quantity }: Body = await request.json()

  const product = await Product.findById(id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  if (product.countInStock < quantity) {
    return throwError({ error: `${product.name} is out of stock`, status: 400 })
  }

  product.countInStock = product.countInStock - quantity

  await product.save()

  return NextResponse.json(null)
})
