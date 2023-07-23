import { NextRequest } from 'next/server'
import { CartItem } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { POST } from '@app/api/cart/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import products from '@mocks/products'
import users from '@mocks/users'

const { _id, name, isAdmin, cartItems: initialCartItems } = users[1]

const defaultPayload = {
  id: _id.toString(),
  name,
  isAdmin,
  cartItems: true,
  shippingAddress: true,
  paymentMethod: false,
}

const addCartItem = async (cartItem: CartItem, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/cart`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(cartItem),
    headers: {
      Authorization: `Bearer ${token}`,
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

        const cartItems = users[1].cartItems

        expect(status).toBe(400)
        expect(statusText).toBe('Item is already in the cart')
        expect(cartItems.length).toBe(1)
      })
    })

    describe('given the cart item is not in the cart', () => {
      it('returns status code 201 and adds item to the cart', async () => {
        const { _id, name, image, price, countInStock } = products[1]

        const cartItem = { _id, name, image, price, countInStock, quantity: 1 }

        const { status } = await addCartItem(cartItem)
        const users = await getUsers()

        const cartItems = users[1].cartItems

        expect(status).toBe(201)
        expect(cartItems[0]).toEqual(initialCartItems[0])
        expect(cartItems.at(-1)).toEqual(cartItem)
      })
    })
  })
})
