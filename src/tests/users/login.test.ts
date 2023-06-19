import { NextRequest } from 'next/server'
import { UserCredentials } from 'types/user'
import { POST } from '@app/api/users/login/route'
import { seedUsers } from '@config/mongoMemoryServer'
import { verifyToken } from '@utils/token/verifyToken'
import { BASE_URL } from '@baseUrl'
import users from '@mocks/users'

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
      const { status, statusText } = await login({
        email: 'mario@example.com',
        password: '123456',
      })

      expect(status).toBe(401)
      expect(statusText).toBe('Invalid credentials')
    })
  })

  describe('given the user password is invalid', () => {
    it('returns status code 401', async () => {
      const { status, statusText } = await login({
        email: 'john@example.com',
        password: '12345',
      })

      expect(status).toBe(401)
      expect(statusText).toBe('Invalid credentials')
    })
  })

  describe('given the user credentials are valid', () => {
    it('sends status code 200 and token', async () => {
      const { _id, name, email } = users[2]

      const { status, token } = await login({
        email,
        password: '123456',
      })

      const payload = await verifyToken(token)

      expect(status).toBe(200)
      expect(_id.toString()).toBe(payload?.id)
      expect(name).toBe(payload?.name)
    })
  })
})
