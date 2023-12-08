import { NextRequest } from 'next/server'
import { BASE_URL } from '@/baseUrl'
import { PATCH } from '@/app/api/products/[id]/route'
import {
  seedProducts,
  seedUsers,
  getProducts,
} from '@/config/mongoMemoryServer'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateToken } from '@/auth/token/generators/generateToken'
import { fakeProductId, fakePayload } from '@/mocks/fakeData'
import products from '@/mocks/products'
import users from '@/mocks/users'

const product = products[0]
const quantity = product.countInStock - 1
const defaultPayload = generatePayload(users[2])

const updateStock = async (
  id: string,
  quantity: number,
  payload = defaultPayload
) => {
  const url = `${BASE_URL}/api/products/${id}`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'PATCH',
    body: JSON.stringify({ id, quantity }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await PATCH(request)
  return { status, statusText }
}

beforeAll(async () => {
  await seedProducts()
  await seedUsers()
})

describe('PATCH /api/products/:id', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const productId = product._id.toString()
      const response = await updateStock(productId, quantity, fakePayload)

      expect(response.status).toBe(404)
      expect(response.statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the product does not exist', () => {
      it('returns status code 404', async () => {
        const response = await updateStock(fakeProductId, quantity)

        expect(response.status).toBe(404)
        expect(response.statusText).toBe('Product not found')
      })
    })

    describe('given the product exists', () => {
      describe('given the product is out of stock', () => {
        it('returns status code 400', async () => {
          const productId = product._id.toString()
          const quantity = product.countInStock + 1

          const { status, statusText } = await updateStock(productId, quantity)
          const products = await getProducts()

          const { countInStock } = products[0]

          expect(status).toBe(400)
          expect(statusText).toBe(`${product.name} is out of stock`)
          expect(countInStock).toBe(product.countInStock)
        })
      })

      describe('given the product is in stock', () => {
        it('returns status code 200 and updates product quantity', async () => {
          const productId = product._id.toString()
          const { status } = await updateStock(productId, quantity)
          const products = await getProducts()
          const { countInStock } = products[0]

          expect(status).toBe(200)
          expect(countInStock).toBe(product.countInStock - quantity)
        })
      })
    })
  })
})
