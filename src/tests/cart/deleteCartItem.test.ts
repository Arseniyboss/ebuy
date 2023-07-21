import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { DELETE } from '@app/api/cart/[id]/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import products from '@mocks/products'
import users from '@mocks/users'

const { _id, name } = users[1]

const defaultPayload = {
  id: _id.toString(),
  name,
}

const deleteCartItem = async (id: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/cart/${id}`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await DELETE(request, { params: { id } })
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('DELETE /api/cart/:id', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const id = products[0]._id.toString()

      const { status, statusText } = await deleteCartItem(id, fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the cart item does not exist', () => {
      it('returns status code 404', async () => {
        const id = products[1]._id.toString()

        const { status, statusText } = await deleteCartItem(id)

        expect(status).toBe(404)
        expect(statusText).toBe('Cart item not found')
      })
    })

    describe('given the cart item exists', () => {
      it('returns status code 200 and deletes the cart item', async () => {
        const id = products[0]._id.toString()

        const { status } = await deleteCartItem(id)
        const users = await getUsers()

        const cartItems = users[1].cartItems

        expect(status).toBe(200)
        expect(cartItems.length).toBe(0)
      })
    })
  })
})
