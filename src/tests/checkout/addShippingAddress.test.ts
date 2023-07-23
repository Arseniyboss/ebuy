import { NextRequest } from 'next/server'
import { JwtPayload } from 'types/jwtPayload'
import { ShippingAddress } from 'types/user'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/checkout/shippingAddress/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const shippingAddress = {
  address: 'New Address',
  country: 'New Country',
  city: 'New City',
  postalCode: 'New Postal Code',
}

const addShippingAddress = async (
  shippingAddress: ShippingAddress,
  payload: JwtPayload
) => {
  const url = `${BASE_URL}/api/checkout/shippingAddress`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(shippingAddress),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText } = await PUT(request)
  return { status, statusText }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/checkout/shippingAddress', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await addShippingAddress(
        shippingAddress,
        fakePayload
      )

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the shipping address does not exist', () => {
      const { _id, name } = users[2]

      const payload = {
        id: _id.toString(),
        name,
      }
      it('returns status code 201 and adds shipping address', async () => {
        const { status } = await addShippingAddress(shippingAddress, payload)

        const users = await getUsers()
        const newShippingAddress = users[2].checkout?.shippingAddress

        expect(status).toBe(201)
        expect(newShippingAddress).toEqual(shippingAddress)
      })
    })
    describe('given the shipping address already exists', () => {
      const { _id, name, checkout } = users[1]

      const initialPaymentMethod = checkout?.paymentMethod

      const payload = {
        id: _id.toString(),
        name,
      }
      it('returns status code 201 and updates shipping address', async () => {
        const { status } = await addShippingAddress(shippingAddress, payload)

        const users = await getUsers()

        const checkout = users[1].checkout
        const newShippingAddress = checkout?.shippingAddress
        const paymentMethod = checkout?.paymentMethod

        expect(status).toBe(201)
        expect(newShippingAddress).toEqual(shippingAddress)
        expect(paymentMethod).toEqual(initialPaymentMethod)
      })
    })
  })
})