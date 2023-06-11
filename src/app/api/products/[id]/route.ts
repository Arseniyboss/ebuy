import { NextResponse, NextRequest } from 'next/server'
import { connectToDB } from '@config/mongodb'
import Product from '@models/product'

export type Params = {
  params: {
    id: string
  }
}

export const GET = async (request: NextRequest, { params }: Params) => {
  await connectToDB()

  const product = await Product.findById(params.id)

  if (!product) {
    return NextResponse.json(null, {
      status: 404,
      statusText: 'Product not found',
    })
  }

  return NextResponse.json(product)
}
