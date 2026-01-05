import { NextResponse } from 'next/server'
import { CreateReviewParams as Body } from '@/types/params'
import { withAuth } from '@/middleware/api/dynamicHandler/withAuth'
import { throwError } from '@/utils/api/throwError'
import { getRating } from '@/utils/getters/getRating'
import Product from '@/models/product'

export const POST = withAuth(async ({ request, user, params }) => {
  const { id } = await params
  const { rating, comment }: Body = await request.json()

  const product = await Product.findById(id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
  }

  const { reviews } = product

  const isAlreadyReviewed = reviews.find((review) => {
    return review.userId.toString() === user._id.toString()
  })

  if (isAlreadyReviewed) {
    return throwError({ error: 'Product already reviewed', status: 400 })
  }

  const review = { userId: user._id.toString(), username: user.name, rating, comment }

  reviews.push(review)

  product.numReviews = reviews.length
  product.rating = getRating(reviews)

  await product.save()

  return NextResponse.json(null, { status: 201 })
})
