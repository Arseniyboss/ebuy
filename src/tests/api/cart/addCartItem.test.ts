import { NextRequest } from 'next/server'
import { CartItem } from '@/types/user'
import { BASE_URL } from '@/baseUrl'
import { POST } from '@/app/api/cart/route'
import { seedUsers, getUsers } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { fakePayload } from '@/mocks/fakeData'
import products from '@/mocks/products'
import users from '@/mocks/users'

const user = users[2]

const { cartItems: initialCartItems } = user

const defaultPayload = generatePayload(user)

const addCartItem = async (cartItem: CartItem, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/cart`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(cartItem),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const { status, statusText } = await POST(request)
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('POST /api/cart', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { _id, name, image, price, countInStock } = products[0]

      const cartItem = { _id, name, image, price, countInStock, quantity: 1 }

      const { status, statusText } = await addCartItem(cartItem, fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the cart item is already in the cart', () => {
      it('returns status code 400', async () => {
        const { _id, name, image, price, countInStock } = products[0]

        const cartItem = { _id, name, image, price, countInStock, quantity: 1 }

        const { status, statusText } = await addCartItem(cartItem)
        const users = await getUsers()

        const { cartItems } = users[2]

        expect(status).toBe(400)
        expect(statusText).toBe('Item is already in the cart')
        expect(cartItems.length).toBe(initialCartItems.length)
      })
    })

    describe('given the cart item is not in the cart', () => {
      it('returns status code 201 and adds item to the cart', async () => {
        const { _id, name, image, price, countInStock } = products[2]

        const cartItem = { _id, name, image, price, countInStock, quantity: 1 }

        const { status } = await addCartItem(cartItem)
        const users = await getUsers()

        const { cartItems } = users[2]

        expect(status).toBe(201)
        expect(cartItems[0]).toEqual(initialCartItems[0])
        expect(cartItems.at(-1)).toEqual(cartItem)
      })
    })
  })
})
