import { NextRequest } from 'next/server'
import { Order } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { GET } from '@app/api/orders/[id]/route'
import { seedOrders } from '@config/mongoMemoryServer'
import { fakeOrderId } from '@mocks/fakeData'
import orders from '@mocks/orders'

const getOrderById = async (id: string) => {
  const url = `${BASE_URL}/api/orders/${id}`
  const request = new NextRequest(url)
  const response = await GET(request, { params: { id } })
  const order: Order = await response.json()
  return { status: response.status, statusText: response.statusText, order }
}

beforeAll(async () => await seedOrders())

describe('GET /api/orders/:id', () => {
  describe('given the orders does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await getOrderById(fakeOrderId)

      expect(status).toBe(404)
      expect(statusText).toBe('Order not found')
    })
  })

  describe('given the order exists', () => {
    it('returns status code 200 and the order', async () => {
      const id = orders[0]._id.toString()
      const { status, order } = await getOrderById(id)

      expect(status).toBe(200)
      expect(order._id).toBe(id)
    })
  })
})
