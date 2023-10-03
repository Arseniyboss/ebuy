import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/orders/[id]/updateToPaid/route'
import { seedUsers, seedOrders, getOrders } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/token/generators/generatePayload'
import { generateToken } from '@auth/token/generators/generateToken'
import { getCurrentDate } from '@utils/getters/getCurrentDate'
import { getDeliveryDate } from '@utils/getters/getDeliveryDate'
import { fakeOrderId, fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'
import orders from '@mocks/orders'

const defaultPayload = generatePayload(users[4])
const orderId = orders[0]._id.toString()

const updateOrderToPaid = async (id: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/orders/${id}/updateToPaid`
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

describe('PUT /api/orders/:id/updateToPaid', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await updateOrderToPaid(
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
        const { status, statusText } = await updateOrderToPaid(fakeOrderId)

        expect(status).toBe(404)
        expect(statusText).toBe('Order not found')
      })
    })

    describe('given the order exists', () => {
      it('returns status code 200 and updates order to paid', async () => {
        const { status } = await updateOrderToPaid(orderId)
        const orders = await getOrders()

        const order = orders[0]

        const currentDate = getCurrentDate()
        const deliveryDate = getDeliveryDate()

        expect(status).toBe(200)

        expect(order.isPaid).toBeTruthy()
        expect(order.paidAt).toBe(currentDate)
        expect(order.deliveryDate).toBe(deliveryDate)
      })
    })
  })
})
