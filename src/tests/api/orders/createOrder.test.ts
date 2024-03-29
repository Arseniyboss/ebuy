import { NextRequest } from 'next/server'
import { CreateOrderParams as Order } from '@/types/params'
import { CartItem, Order as Data } from '@/types/mongo'
import { BASE_URL } from '@/baseUrl'
import { POST } from '@/app/api/orders/route'
import { seedUsers, seedOrders, getOrders } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { fakePayload } from '@/mocks/fakeData'
import users from '@/mocks/users'
import initialOrders from '@/mocks/orders'

const user = users[4]

const defaultPayload = generatePayload(user)

const stringifyItemsId = (items: CartItem[]) => {
  return items.map((item) => {
    return { ...item, _id: item._id.toString() }
  })
}

const cartItems = stringifyItemsId(user.cartItems)
const totalPrice = getTotalPrice(cartItems)

const address = user.address!
const paymentMethod = user.paymentMethod!

const order: Order = {
  orderItems: cartItems,
  address,
  paymentMethod,
  totalPrice,
}

const createOrder = async (payload = defaultPayload) => {
  const url = `${BASE_URL}/api/orders`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const response = await POST(request)
  const data: Data = await response.json()

  return {
    status: response.status,
    statusText: response.statusText,
    order: data,
  }
}

beforeAll(async () => {
  await seedUsers()
  await seedOrders()
})

describe('POST /api/orders', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await createOrder(fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    it('returns status code 201 and creates an order', async () => {
      const { status, order } = await createOrder()

      const orders = await getOrders()

      expect(status).toBe(201)

      expect(orders.length).toBe(initialOrders.length + 1)

      expect(order.userId.toString()).toBe(user._id.toString())

      expect(order.orderItems).toEqual(cartItems)
      expect(order.address).toEqual(address)
      expect(order.paymentMethod).toEqual(paymentMethod)
      expect(order.totalPrice).toEqual(totalPrice)

      expect(order.isPaid).toBeFalsy()
      expect(order.isDelivered).toBeFalsy()
    })
  })
})
