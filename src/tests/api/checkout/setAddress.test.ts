import { NextRequest } from 'next/server'
import { UserPayload } from '@/types/jwtPayload'
import { Address } from '@/types/user'
import { BASE_URL } from '@/baseUrl'
import { PUT } from '@/app/api/checkout/address/route'
import { seedUsers, getUsers } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { verifyAccessToken } from '@/auth/verifyTokens'
import { fakePayload } from '@/mocks/fakeData'
import users from '@/mocks/users'

const address = {
  street: 'New Street',
  country: 'New Country',
  city: 'New City',
  postalCode: 'New Postal Code',
}

const setAddress = async (address: Address, payload: UserPayload) => {
  const url = `${BASE_URL}/api/checkout/address`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(address),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newAccessToken = cookies.get('accessToken')?.value
  return { status, statusText, accessToken: newAccessToken }
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
        const { status, accessToken } = await setAddress(address, payload)

        const newPayload = await verifyAccessToken(accessToken)
        const users = await getUsers()
        const newShippingAddress = users[2].address

        expect(status).toBe(201)
        expect(newShippingAddress).toEqual(address)
        expect(newPayload?.user.address).toBeTruthy()
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
