import { NextResponse, NextRequest } from 'next/server'
import { Params } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/throwError'
import { getRating } from '@utils/getRating'
import Product from '@models/product'

type Body = {
  rating: number
  comment: string
}

export const POST = async (request: NextRequest, { params }: Params) => {
  await connectToDB()

  const { rating, comment }: Body = await request.json()

  const user = await decodeToken(request)
  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const { id, name } = user
  const { reviews } = product

  const isAlreadyReviewed = reviews.find((review) => review.user === id)

  if (isAlreadyReviewed) {
    return throwError({ error: 'Product already reviewed', status: 400 })
  }

  const review = { user: id, name, rating, comment }

  reviews.push(review)

  product.numReviews = reviews.length
  product.rating = getRating(reviews)

  await product.save()

  return NextResponse.json(null, { status: 201 })
}
