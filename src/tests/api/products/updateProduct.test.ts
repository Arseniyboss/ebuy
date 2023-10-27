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

const quantity = 2

const product = products[0]

const defaultPayload = generatePayload(users[2])

const updateProduct = async (id: string, payload = defaultPayload) => {
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
      const id = product._id.toString()

      const { status, statusText } = await updateProduct(id, fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the product does not exist', () => {
      it('returns status code 404', async () => {
        const { status, statusText } = await updateProduct(fakeProductId)

        expect(status).toBe(404)
        expect(statusText).toBe('Product not found')
      })
    })

    describe('given the product exists', () => {
      it('returns status code 200 and updates product quantity', async () => {
        const id = product._id.toString()

        const { status } = await updateProduct(id)
        const products = await getProducts()

        const { countInStock } = products[0]

        expect(status).toBe(200)
        expect(countInStock).toBe(product.countInStock - quantity)
      })
    })
  })
})
