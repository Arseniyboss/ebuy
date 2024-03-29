import { NextRequest } from 'next/server'
import { UserLoginParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { POST } from '@/app/api/users/login/route'
import { seedUsers } from '@/database/mongoMemoryServer'
import { verifyAccessToken } from '@/auth/verifyTokens'
import users from '@/mocks/users'

const login = async (userCredentials: UserLoginParams) => {
  const url = `${BASE_URL}/api/users/login`
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(userCredentials),
  })
  const { status, statusText, cookies } = await POST(request)
  const accessToken = cookies.get('accessToken')?.value
  return { status, statusText, accessToken }
}

beforeAll(async () => await seedUsers())

describe('GET /api/users/login', () => {
  describe('given the user email is invalid', () => {
    it('returns status code 401', async () => {
      const userCredentials = {
        email: 'mario@example.com',
        password: '123456',
      }

      const { status, statusText } = await login(userCredentials)

      expect(status).toBe(401)
      expect(statusText).toBe('Invalid credentials')
    })
  })

  describe('given the user password is invalid', () => {
    it('returns status code 401', async () => {
      const userCredentials = {
        email: 'john@example.com',
        password: '12345',
      }

      const { status, statusText } = await login(userCredentials)

      expect(status).toBe(401)
      expect(statusText).toBe('Invalid credentials')
    })
  })

  describe('given the user credentials are valid', () => {
    it('returns status code 200 and sends token', async () => {
      const { _id, name, email } = users[1]

      const userCredentials = {
        email,
        password: '123456',
      }

      const { status, accessToken } = await login(userCredentials)
      const payload = await verifyAccessToken(accessToken)

      expect(status).toBe(200)
      expect(_id.toString()).toBe(payload?.user.id)
      expect(name).toBe(payload?.user.name)
    })
  })
})
