import { NextRequest } from 'next/server'
import { UserPayload } from '@/types/jwtPayload'
import { GetOrdersData as Data } from '@/types/api'
import { OrdersQueryParams as QueryParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { GET } from '@/app/api/admin/orders/route'
import { seedUsers, seedOrders } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { fakePayload } from '@/mocks/fakeData'
import users from '@/mocks/users'

const payload = generatePayload(users[0])

const getOrders = async (
  payload: UserPayload,
  { page = 1, status = '' }: QueryParams = {}
) => {
  const url = `${BASE_URL}/api/admin/orders?page=${page}&status=${status}`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

describe('GET /api/admin/orders', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await getOrders(fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the user is not an admin', () => {
      it('returns status code 401', async () => {
        const payload = generatePayload(users[1])

        const { status, statusText } = await getOrders(payload)

        expect(status).toBe(401)
        expect(statusText).toBe('Not authorized')
      })
    })

    describe('given the user is an admin', () => {
      describe('given the status is not applied', () => {
        it('returns status code 200 and user orders on the first page', async () => {
          const { status, orders, pages } = await getOrders(payload)

          expect(status).toBe(200)
          expect(pages).toBe(2)
          expect(orders.length).toBe(2)
        })

        it('returns status code 200 and user orders on the second page', async () => {
          const { status, orders, pages } = await getOrders(payload, {
            page: 2,
          })

          expect(status).toBe(200)
          expect(pages).toBe(2)
          expect(orders.length).toBe(2)
        })
      })

      describe('given the status is applied', () => {
        it('returns status code 200 and filtered user orders', async () => {
          const { status, orders } = await getOrders(payload, {
            status: 'not-delivered',
          })

          expect(status).toBe(200)

          orders.forEach((order) => {
            expect(order.isPaid).toBeTruthy()
            expect(order.isDelivered).toBeFalsy()
          })
        })
      })

      describe('given the page number is invalid', () => {
        describe('given the page number is less than 1', () => {
          it('returns status code 200 and paginated user orders', async () => {
            const { status, orders, pages } = await getOrders(payload, {
              page: -1,
            })

            expect(status).toBe(200)
            expect(pages).toBe(2)
            expect(orders.length).toBe(2)
          })
        })

        describe('given the page number is greater than the total number of pages', () => {
          it('returns status code 200 and paginated user orders', async () => {
            const { status, orders, pages } = await getOrders(payload, {
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
})
