import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/orders/[id]/updateToDelivered/route'
import { seedUsers, seedOrders, getOrders } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/generatePayload'
import { generateToken } from '@auth/generateToken'
import { getCurrentDate } from '@utils/getCurrentDate'
import { fakeOrderId, fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'
import orders from '@mocks/orders'

const defaultPayload = generatePayload(users[0])
const orderId = orders[1]._id.toString()

const updateOrderToDelivered = async (id: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/orders/${id}/updateToDelivered`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const response = await PUT(request, { params: { id } })
  return { status: response.status, statusText: response.statusText }
}

beforeAll(async () => {
  await seedUsers()
  await seedOrders()
})

describe('PUT /api/orders/:id/updateToDelivered', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await updateOrderToDelivered(
        fakeOrderId,
        fakePayload
      )

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the user is not an admin', () => {
      it('returns status code 404', async () => {
        const payload = generatePayload(users[1])

        const { status, statusText } = await updateOrderToDelivered(
          orderId,
          payload
        )

        expect(status).toBe(401)
        expect(statusText).toBe('Not authorized')
      })
    })

    describe('given the user is an admin', () => {
      describe('given the order does not exist', () => {
        it('returns status code 401', async () => {
          const { status, statusText } = await updateOrderToDelivered(
            fakeOrderId
          )

          expect(status).toBe(404)
          expect(statusText).toBe('Order not found')
        })
      })

      describe('given the order exists', () => {
        it('returns status code 200 and updates order to delivered', async () => {
          const { status } = await updateOrderToDelivered(orderId)
          const orders = await getOrders()

          const order = orders[1]

          const currentDate = getCurrentDate()

          expect(status).toBe(200)

          expect(order.isDelivered).toBeTruthy()
          expect(order.deliveredAt).toBe(currentDate)
          expect(order.deliveryDate).toBeUndefined()
        })
      })
    })
  })
})
