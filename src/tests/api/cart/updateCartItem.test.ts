import { NextRequest } from 'next/server'
import { BASE_URL } from '@/baseUrl'
import { PATCH } from '@/app/api/cart/[id]/route'
import { seedUsers, getUsers } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { fakePayload } from '@/mocks/fakeData'
import products from '@/mocks/products'
import users from '@/mocks/users'

const quantity = 1

const defaultPayload = generatePayload(users[2])

const updateCartItem = async (id: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/cart/${id}`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'PATCH',
    body: JSON.stringify(quantity),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const params = Promise.resolve({ id })
  const { status, statusText } = await PATCH(request, { params })
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('PATCH /api/cart/:id', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const id = products[0]._id.toString()

      const { status, statusText } = await updateCartItem(id, fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the cart item does not exist', () => {
      it('returns status code 404', async () => {
        const id = products[2]._id.toString()

        const { status, statusText } = await updateCartItem(id)

        expect(status).toBe(404)
        expect(statusText).toBe('Cart item not found')
      })
    })

    describe('given the cart item exists', () => {
      it('returns status code 200 and updates the cart item', async () => {
        const id = products[0]._id.toString()

        const { status } = await updateCartItem(id)
        const users = await getUsers()

        const cartItem = users[2].cartItems[0]

        expect(status).toBe(200)
        expect(cartItem.quantity).toBe(1)
      })
    })
  })
})
