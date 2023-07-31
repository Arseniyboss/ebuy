import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { DELETE } from '@app/api/cart/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/generatePayload'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const defaultPayload = generatePayload(users[2])

const clearCart = async (payload = defaultPayload) => {
  const url = `${BASE_URL}/api/cart`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await DELETE(request)
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('DELETE /api/cart', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await clearCart(fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    it('returns status code 200 and clears the cart', async () => {
      const { status } = await clearCart()
      const users = await getUsers()

      const { cartItems } = users[2]

      expect(status).toBe(200)
      expect(cartItems).toEqual([])
    })
  })
})
