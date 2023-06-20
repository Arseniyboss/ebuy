import { NextRequest } from 'next/server'
import { POST } from '@app/api/users/login/route'
import { seedUsers } from '@config/mongoMemoryServer'
import { verifyToken } from '@utils/token/verifyToken'
import { BASE_URL } from '@baseUrl'
import users from '@mocks/users'

type UserCredentials = {
  email: string
  password: string
}

const login = async (userCredentials: UserCredentials) => {
  const url = `${BASE_URL}/api/users/login`
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(userCredentials),
  })
  const { status, statusText, cookies } = await POST(request)
  const token = cookies.get('token')?.value
  return { status, statusText, token }
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
      const { _id, name, email } = users[2]

      const userCredentials = {
        email,
        password: '123456',
      }

      const { status, token } = await login(userCredentials)
      const payload = await verifyToken(token)

      expect(status).toBe(200)
      expect(_id.toString()).toBe(payload?.id)
      expect(name).toBe(payload?.name)
    })
  })
})
