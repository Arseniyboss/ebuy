import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/orders/[id]/updateToPaid/route'
import { seedOrders, getOrders } from '@config/mongoMemoryServer'
import { getCurrentDate } from '@utils/getCurrentDate'
import { getDeliveryDate } from '@utils/getDeliveryDate'
import { fakeOrderId } from '@mocks/fakeData'
import orders from '@mocks/orders'

const orderId = orders[0]._id.toString()

const updateOrderToPaid = async (id: string) => {
  const url = `${BASE_URL}/api/orders/${id}/updateToPaid`
  const request = new NextRequest(url)
  const response = await PUT(request, { params: { id } })
  return { status: response.status, statusText: response.statusText }
}

beforeAll(async () => await seedOrders())

describe('PUT /api/orders/:id/updateToPaid', () => {
  describe('given the orders does not exist', () => {
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
