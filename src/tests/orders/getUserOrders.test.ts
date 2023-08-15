import { NextRequest } from 'next/server'
import { UserPayload } from 'types/jwtPayload'
import { GetUserOrdersData as Data } from 'types/api'
import { UserOrdersQueryParams } from 'types/params'
import { BASE_URL } from '@baseUrl'
import { GET } from '@app/api/orders/route'
import { seedUsers, seedOrders } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/generatePayload'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const payload = generatePayload(users[4])

const getUserOrders = async (
  payload: UserPayload,
  { page = 1, status = '' }: UserOrdersQueryParams = {}
) => {
  const url = `${BASE_URL}/api/orders?page=${page}&status=${status}`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const response = await GET(request)
  const data: Data = await response.json()
  return {
    status: response.status,
    statusText: response.statusText,
    orders: data?.orders,
    pages: data?.pages,
  }
}

beforeAll(async () => {
  await seedUsers()
  await seedOrders()
})

describe('GET /api/orders', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await getUserOrders(fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the status is not applied', () => {
      it('returns status code 200 and user orders on the first page', async () => {
        const { status, orders, pages } = await getUserOrders(payload)

        expect(status).toBe(200)
        expect(pages).toBe(2)
        expect(orders.length).toBe(2)

        orders.forEach((order) => {
          expect(order.userId.toString()).toBe(payload.id)
        })
      })

      it('returns status code 200 and user orders on the second page', async () => {
        const { status, orders, pages } = await getUserOrders(payload, {
          page: 2,
        })

        expect(status).toBe(200)
        expect(pages).toBe(2)
        expect(orders.length).toBe(1)

        orders.forEach((order) => {
          expect(order.userId.toString()).toBe(payload.id)
        })
      })
    })

    describe('given the status is applied', () => {
      it('returns status code 200 and filtered user orders', async () => {
        const { status, orders } = await getUserOrders(payload, {
          status: 'not-paid',
        })

        expect(status).toBe(200)

        orders.forEach((order) => {
          expect(order.isPaid).toBeFalsy()
        })
      })
    })

    describe('given the page number is invalid', () => {
      describe('given the page number is less than 1', () => {
        it('returns status code 200 and paginated user orders', async () => {
          const { status, orders, pages } = await getUserOrders(payload, {
            page: -1,
          })

          expect(status).toBe(200)
          expect(pages).toBe(2)
          expect(orders.length).toBe(2)
        })
      })

      describe('given the page number is greater than the total number of pages', () => {
        it('returns status code 200 and paginated user orders', async () => {
          const { status, orders, pages } = await getUserOrders(payload, {
            page: 3,
          })

          expect(status).toBe(200)
          expect(pages).toBe(2)
          expect(orders.length).toBe(2)
        })
      })
    })
  })
})
