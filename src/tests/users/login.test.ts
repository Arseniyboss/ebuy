import { NextRequest } from 'next/server'
import { POST } from '@app/api/users/login/route'
import { seedUsers } from '@config/mongoMemoryServer'
import { BASE_URL } from '@baseUrl'

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
  const response = await POST(request)
  return { status: response.status, statusText: response.statusText }
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
    it('sends status code 200', async () => {
      const userCredentials = {
        email: 'john@example.com',
        password: '123456',
      }

      const { status } = await login(userCredentials)

      expect(status).toBe(200)
    })
  })
})
