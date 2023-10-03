import { NextRequest } from 'next/server'
import { UserPayload } from 'types/jwtPayload'
import { Address } from 'types/base/user'
import { BASE_URL } from '@baseUrl'
import { PUT } from '@app/api/checkout/address/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generatePayload } from '@auth/token/generators/generatePayload'
import { generateToken } from '@auth/token/generators/generateToken'
import { verifyToken } from '@auth/token/verifyToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const address = {
  street: 'New Street',
  country: 'New Country',
  city: 'New City',
  postalCode: 'New Postal Code',
}

const setAddress = async (address: Address, payload: UserPayload) => {
  const url = `${BASE_URL}/api/checkout/address`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(address),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newToken = cookies.get('token')?.value
  return { status, statusText, token: newToken }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/checkout/address', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await setAddress(address, fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    describe('given the user address does not exist', () => {
      const payload = generatePayload(users[2])
      it('returns status code 201 and adds user address', async () => {
        const { status, token } = await setAddress(address, payload)

        const newPayload = await verifyToken(token)
        const users = await getUsers()
        const newShippingAddress = users[2].address

        expect(status).toBe(201)
        expect(newShippingAddress).toEqual(address)
        expect(newPayload?.address).toBeTruthy()
      })
    })
    describe('given the user address already exists', () => {
      const payload = generatePayload(users[3])
      it('returns status code 201 and updates user address', async () => {
        const { status } = await setAddress(address, payload)

        const users = await getUsers()
        const newShippingAddress = users[3].address

        expect(status).toBe(201)
        expect(newShippingAddress).toEqual(address)
      })
    })
  })
})
