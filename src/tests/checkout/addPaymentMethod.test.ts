import { NextRequest } from 'next/server'
import { UserPayload } from 'types/jwtPayload'
import { PaymentMethod } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/checkout/paymentMethod/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/generatePayload'
import { generateToken } from '@auth/generateToken'
import { verifyToken } from '@auth/verifyToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const paymentMethod = 'PayPal'

const addPaymentMethod = async (
  paymentMethod: PaymentMethod,
  payload: UserPayload
) => {
  const url = `${BASE_URL}/api/checkout/paymentMethod`
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

describe('PUT /api/checkout/paymentMethod', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await addPaymentMethod(
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
        const { status, token } = await addPaymentMethod(paymentMethod, payload)

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
        const { status } = await addPaymentMethod(paymentMethod, payload)

        const users = await getUsers()
        const newPaymentMethod = users[4].paymentMethod

        expect(status).toBe(201)
        expect(newPaymentMethod).toEqual(paymentMethod)
      })
    })
  })
})
