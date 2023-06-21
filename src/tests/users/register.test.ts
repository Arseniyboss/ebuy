import { NextRequest } from 'next/server'
import { POST } from '@app/api/users/register/route'
import { seedUsers } from '@config/mongoMemoryServer'
import { verifyToken } from '@auth/verifyToken'
import { BASE_URL } from '@baseUrl'
import { User } from 'types/api'

const register = async (user: User) => {
  const url = `${BASE_URL}/api/users/login`
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(user),
  })
  const { status, statusText, cookies } = await POST(request)
  const token = cookies.get('token')?.value
  return { status, statusText, token }
}

beforeAll(async () => await seedUsers())

describe('GET /api/users/register', () => {
  describe('given the user email is already in use', () => {
    it('returns status code 400', async () => {
      const user = {
        name: 'John',
        email: 'john@example.com',
        password: '123456',
      }

      const { status, statusText } = await register(user)

      expect(status).toBe(400)
      expect(statusText).toBe('Email is already in use')
    })
  })

  describe('given the user email is not already in use', () => {
    it('returns status code 200 and sends token', async () => {
      const user = {
        name: 'Mario',
        email: 'mario@example.com',
        password: '123456',
      }

      const { status, token } = await register(user)
      const payload = await verifyToken(token)

      expect(status).toBe(201)
      expect(user.name).toBe(payload?.name)
    })
  })
})
