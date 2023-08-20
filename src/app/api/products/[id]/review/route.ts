import { NextResponse, NextRequest } from 'next/server'
import { PageParams, CreateReviewParams as Body } from 'types/params'
import { connectToDB } from '@config/mongodb'
import { decodeToken } from '@auth/decodeToken/requestHeaders'
import { throwError } from '@utils/api/throwError'
import { getRating } from '@utils/getters/getRating'
import Product from '@models/product'
import User from '@models/user'

export const POST = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const { rating, comment }: Body = await request.json()

  const decoded = await decodeToken(request)

  const product = await Product.findById(params.id)
  const user = await User.findById(decoded?.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const { reviews } = product

  const isAlreadyReviewed = reviews.find(
    (review) => review.userId.toString() === user.id
  )

  if (isAlreadyReviewed) {
    return throwError({ error: 'Product already reviewed', status: 400 })
  }

  const review = { userId: user.id, username: user.name, rating, comment }

  reviews.push(review)

  product.numReviews = reviews.length
  product.rating = getRating(reviews)

  await product.save()

  return NextResponse.json(null, { status: 201 })
}
