import { NextRequest } from 'next/server'
import { JwtPayload } from 'types/jwtPayload'
import { POST } from '@app/api/products/[id]/review/route'
import { seedProducts, seedUsers, getProducts } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { BASE_URL } from '@baseUrl'
import products from '@mocks/products'
import users from '@mocks/users'

const { _id, name } = users[2]

const payload = {
  id: _id.toString(),
  name,
}

const review = {
  rating: 5,
  comment: 'Excellent Product!',
}

type Params = {
  productId: string
  payload: JwtPayload
}

const createReview = async ({ productId, payload }: Params) => {
  const url = `${BASE_URL}/api/products/${productId}/review`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await POST(request, {
    params: { id: productId },
  })
  return { status, statusText }
}

beforeAll(async () => {
  await seedProducts()
  await seedUsers()
})

describe('POST /api/products/:id/review', () => {
  describe('given the product does not exist', () => {
    it('returns status code 404', async () => {
      const productId = '62dbfa7f31c12b460f19f2b4'
      const { status, statusText } = await createReview({ productId, payload })

      expect(status).toBe(404)
      expect(statusText).toBe('Product not found')
    })
  })

  describe('given the product exists', () => {
    describe('given the user does not exist', () => {
      it('returns status code 404', async () => {
        const productId = products[0]._id.toString()

        const payload = {
          id: '62dbfa7f31c12b460f19f2b0',
          name: 'John',
        }

        const { status, statusText } = await createReview({
          productId,
          payload,
        })

        expect(status).toBe(404)
        expect(statusText).toBe('User not found')
      })
    })

    describe('given the user exists', () => {
      describe('given the product has already been reviewed', () => {
        it('returns status code 400', async () => {
          const productId = products[0]._id.toString()
          const { status, statusText } = await createReview({
            productId,
            payload,
          })

          expect(status).toBe(400)
          expect(statusText).toBe('Product already reviewed')
        })
      })

      describe('given the product has not yet been reviewed', () => {
        it('returns status code 201', async () => {
          const productId = products[1]._id.toString()

          const { status } = await createReview({ productId, payload })
          const newProducts = await getProducts()

          const product = newProducts[1]
          const review = product.reviews[1]
          const { userId, username, rating, comment } = review

          expect(status).toBe(201)
          expect(userId.toString()).toBe(users[2]._id.toString())
          expect(username).toBe(users[2].name)
          expect(rating).toBe(review.rating)
          expect(comment).toBe(review.comment)
          expect(product.rating).toBe(4.5)
        })
      })
    })
  })
})
