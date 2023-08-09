import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/orders/[id]/markAsPaid/route'
import { seedOrders, getOrders } from '@config/mongoMemoryServer'
import { getCurrentDate } from '@utils/getCurrentDate'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { fakeOrderId } from '@mocks/fakeData'
import orders from '@mocks/orders'

const orderId = orders[0]._id.toString()

const markAsPaid = async (id: string) => {
  const url = `${BASE_URL}/api/orders/${id}/markAsPaid`
  const request = new NextRequest(url)
  const response = await PUT(request, { params: { id } })
  return { status: response.status, statusText: response.statusText }
}

beforeAll(async () => await seedOrders())

describe('PUT /api/orders/:id/markAsPaid', () => {
  describe('given the orders does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await markAsPaid(fakeOrderId)

      expect(status).toBe(404)
      expect(statusText).toBe('Order not found')
    })
  })

  describe('given the order exists', () => {
    it('returns status code 200 and marks the order as paid', async () => {
      const { status } = await markAsPaid(orderId)
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
