import { NextResponse, NextRequest } from 'next/server'
import { Params } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { throwError } from '@utils/throwError'
import Product from '@models/product'

export const GET = async (request: NextRequest, { params }: Params) => {
  await connectToDB()

  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  return NextResponse.json(product)
}
