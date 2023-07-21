import { NextRequest } from 'next/server'
import { JwtPayload } from 'types/jwtPayload'
import { User } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { GET } from '@app/api/users/user/route'
import { seedUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { fakePayload } from '@mocks/fakeData'
import users from '@mocks/users'

const { _id, name } = users[0]

const payload = {
  id: _id.toString(),
  name,
}

const getUser = async (payload: JwtPayload) => {
  const url = `${BASE_URL}/api/users/user`
  const token = await generateToken(payload)
  const request = new NextRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const response = await GET(request)
  const user: User = await response.json()
  return { status: response.status, statusText: response.statusText, user }
}

beforeAll(async () => await seedUsers())

describe('GET /api/users/user', () => {
  describe('given the user does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await getUser(fakePayload)

      expect(status).toBe(404)
      expect(statusText).toBe('User not found')
    })
  })

  describe('given the user exists', () => {
    it('returns status code 200 and the user', async () => {
      const { status, user } = await getUser(payload)

      expect(status).toBe(200)
      expect(user._id).toBe(payload.id)
    })
  })
})
