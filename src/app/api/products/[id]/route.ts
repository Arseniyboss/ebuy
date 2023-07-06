import { NextResponse, NextRequest } from 'next/server'
import { PageParams } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import Product from '@models/product'

export const GET = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  return NextResponse.json(product)
}
