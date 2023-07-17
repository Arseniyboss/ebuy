import { NextRequest } from 'next/server'
import { Types } from 'mongoose'
import { JwtPayload } from 'types/jwtPayload'
import { CartItem } from 'types/product'
import { POST } from '@app/api/cart/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { BASE_URL } from '@baseUrl'
import users from '@mocks/users'

const { ObjectId } = Types

const { _id, name, cartItems: initialCartItems } = users[1]

const payload = {
  id: _id.toString(),
  name,
}

type Params = {
  cartItem: CartItem
  payload: JwtPayload
}

const addCartItem = async ({ cartItem, payload }: Params) => {
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
      const cartItem = {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b5'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 1,
      }

      const payload = {
        id: '62dbfa7f31c12b460f19f2b0',
        name: 'John',
      }

      const { status, statusText } = await addCartItem({ cartItem, payload })

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the cart item is already in the cart', () => {
      it('returns status code 400', async () => {
        const cartItem = {
          _id: new ObjectId('62dbfa7f31c12b460f19f2b5'),
          name: 'Airpods Wireless Bluetooth Headphones',
          image: '/images/airpods.jpg',
          price: 129.99,
          countInStock: 3,
          quantity: 1,
        }

        const { status, statusText } = await addCartItem({ cartItem, payload })
        const users = await getUsers()

        const cartItems = users[1].cartItems

        expect(status).toBe(400)
        expect(statusText).toBe('Item is already in the cart')
        expect(cartItems.length).toBe(1)
      })
    })

    describe('given the cart item is not in the cart', () => {
      it('returns status code 201', async () => {
        const cartItem = {
          _id: new ObjectId('62dbfa7f31c12b460f19f2b6'),
          name: 'iPhone 11 Pro 256GB Memory',
          image: '/images/phone.jpg',
          price: 599.99,
          countInStock: 10,
          quantity: 2,
        }

        const { status } = await addCartItem({ cartItem, payload })
        const users = await getUsers()

        const cartItems = users[1].cartItems

        expect(status).toBe(201)
        expect(cartItems[0]).toEqual(initialCartItems[0])
        expect(cartItems.at(-1)).toEqual(cartItem)
      })
    })
  })
})
