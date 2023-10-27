import { NextRequest } from 'next/server'
import { UserPayload } from '@/types/jwtPayload'
import { PaymentMethod } from '@/types/base/user'
import { BASE_URL } from '@/baseUrl'
import { PUT } from '@/app/api/checkout/payment/route'
import { seedUsers, getUsers } from '@/config/mongoMemoryServer'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateToken } from '@/auth/token/generators/generateToken'
import { verifyToken } from '@/auth/token/verifyToken'
import { fakePayload } from '@/mocks/fakeData'
import users from '@/mocks/users'

const paymentMethod = 'PayPal'

const setPaymentMethod = async (
  paymentMethod: PaymentMethod,
  payload: UserPayload
) => {
  const url = `${BASE_URL}/api/checkout/payment`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(paymentMethod),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newToken = cookies.get('token')?.value
  return { status, statusText, token: newToken }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/checkout/payment', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await setPaymentMethod(
        paymentMethod,
        fakePayload
      )

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the payment method does not exist', () => {
      const payload = generatePayload(users[3])
      it('returns status code 201 and adds payment method', async () => {
        const { status, token } = await setPaymentMethod(paymentMethod, payload)

        const newPayload = await verifyToken(token)
        const users = await getUsers()
        const newPaymentMethod = users[3].paymentMethod

        expect(status).toBe(201)
        expect(newPaymentMethod).toEqual(paymentMethod)
        expect(newPayload?.paymentMethod).toBeTruthy()
      })
    })
    describe('given the payment method already exists', () => {
      const payload = generatePayload(users[4])
      it('returns status code 201 and updates payment method', async () => {
        const { status } = await setPaymentMethod(paymentMethod, payload)

        const users = await getUsers()
        const newPaymentMethod = users[4].paymentMethod

        expect(status).toBe(201)
        expect(newPaymentMethod).toEqual(paymentMethod)
      })
    })
  })
})
