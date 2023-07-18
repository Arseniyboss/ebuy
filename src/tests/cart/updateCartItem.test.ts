import { NextRequest } from 'next/server'
import { JwtPayload } from 'types/jwtPayload'
import { PATCH } from '@app/api/cart/[id]/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { BASE_URL } from '@baseUrl'
import users from '@mocks/users'

const quantity = 1

const { _id, name } = users[1]

const payload = {
  id: _id.toString(),
  name,
}

type Params = {
  id: string
  payload: JwtPayload
}

const updateCartItem = async ({ id, payload }: Params) => {
  const url = `${BASE_URL}/api/cart/${id}`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'PATCH',
    body: JSON.stringify(quantity),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await PATCH(request, { params: { id } })
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('PATCH /api/cart/:id', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const id = '62dbfa7f31c12b460f19f2b5'

      const payload = {
        id: '62dbfa7f31c12b460f19f2b0',
        name: 'John',
      }

      const { status, statusText } = await updateCartItem({ id, payload })

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the cart item does not exist', () => {
      it('returns status code 404', async () => {
        const id = '62dbfa7f31c12b460f19f2b6'

        const { status, statusText } = await updateCartItem({ id, payload })

        expect(status).toBe(404)
        expect(statusText).toBe('Cart item not found')
      })
    })

    describe('given the cart item exists', () => {
      it('returns status code 200', async () => {
        const id = '62dbfa7f31c12b460f19f2b5'

        const { status } = await updateCartItem({ id, payload })
        const users = await getUsers()

        const cartItem = users[1].cartItems[0]

        expect(status).toBe(200)
        expect(cartItem.quantity).toBe(1)
      })
    })
  })
})
