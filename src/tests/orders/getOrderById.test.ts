import { NextRequest } from 'next/server'
import { Order } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { GET } from '@app/api/orders/[id]/route'
import { seedUsers, seedOrders } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/generatePayload'
import { generateToken } from '@auth/generateToken'
import { fakeOrderId, fakePayload } from '@mocks/fakeData'
import orders from '@mocks/orders'
import users from '@mocks/users'

const defaultPayload = generatePayload(users[4])
const orderId = orders[0]._id.toString()

const getOrderById = async (id: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/orders/${id}`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const response = await GET(request, { params: { id } })
  const order: Order = await response.json()
  return { status: response.status, statusText: response.statusText, order }
}

beforeAll(async () => {
  await seedUsers()
  await seedOrders()
})

describe('GET /api/orders/:id', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await getOrderById(
        fakeOrderId,
        fakePayload
      )

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the order does not exist', () => {
      it('returns status code 404', async () => {
        const { status, statusText } = await getOrderById(fakeOrderId)

        expect(status).toBe(404)
        expect(statusText).toBe('Order not found')
      })
    })

    describe('given the order exists', () => {
      describe('given the order does not belong to the user', () => {
        describe('given the user is not an admin', () => {
          it('returns status code 404', async () => {
            const payload = generatePayload(users[3])

            const { status, statusText } = await getOrderById(orderId, payload)

            expect(status).toBe(404)
            expect(statusText).toBe('Not authorized')
          })
        })

        describe('given the user is an admin', () => {
          it('returns status code 200 and the order', async () => {
            const payload = generatePayload(users[0])
            const { status, order } = await getOrderById(orderId, payload)

            expect(status).toBe(200)
            expect(order._id).toBe(orderId)
          })
        })
      })

      describe('given the order belongs to the user', () => {
        it('returns status code 200 and the order', async () => {
          const { status, order } = await getOrderById(orderId)

          expect(status).toBe(200)
          expect(order._id).toBe(orderId)
        })
      })
    })
  })
})
