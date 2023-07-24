import { NextRequest } from 'next/server'
import { UserRegisterParams } from 'types/params'
import { BASE_URL } from '@baseUrl'
import { POST } from '@app/api/users/register/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { verifyToken } from '@auth/verifyToken'
import initialUsers from '@mocks/users'

const register = async (user: UserRegisterParams) => {
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
        email: 'john@gmail.com',
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
        email: 'mario@gmail.com',
        password: '123456',
      }

      const { status, token } = await register(user)
      const payload = await verifyToken(token)
      const users = await getUsers()

      expect(status).toBe(201)
      expect(users.length).toBe(initialUsers.length + 1)
      expect(user.name).toBe(payload?.name)
    })
  })
})
