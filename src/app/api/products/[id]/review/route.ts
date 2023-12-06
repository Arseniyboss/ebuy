import { NextResponse } from 'next/server'
import { CreateReviewParams as Body } from '@/types/params'
import { withAuth } from '@/utils/api/withAuth/dynamicHandler'
import { throwError } from '@/utils/api/throwError'
import { getRating } from '@/utils/getters/getRating'
import Product from '@/models/product'

export const POST = withAuth(async ({ request, user, params }) => {
  const { rating, comment }: Body = await request.json()

  const product = await Product.findById(params.id)

  if (!product) {
    return throwError({ error: 'Product not found', status: 404 })
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
})
