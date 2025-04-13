import { NextRequest } from 'next/server'
import { UpdateUserParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { PUT } from '@/app/api/users/user/route'
import { seedUsers, getUsers } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { verifyAccessToken } from '@/auth/verifyTokens'
import users from '@/mocks/users'

const payload = generatePayload(users[1])

const updateUser = async (user: UpdateUserParams) => {
  const url = `${BASE_URL}/api/users/user`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newAccessToken = cookies.get('accessToken')?.value
  return { status, statusText, accessToken: newAccessToken }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/users/user', () => {
  describe('given the user email is already in use', () => {
    it('returns status code 400', async () => {
      const user = {
        name: 'John',
        email: 'jane@gmail.com',
      }

      const { status, statusText } = await updateUser(user)

      expect(status).toBe(400)
      expect(statusText).toBe('Email is already in use')
    })
  })

  describe('given the user email is not already in use', () => {
    it('returns status code 200 and updates user name', async () => {
      const user = {
        name: 'John',
        email: 'john@gmail.com',
      }

      const { status, accessToken } = await updateUser(user)
      const newPayload = await verifyAccessToken(accessToken)
      const users = await getUsers()

      expect(status).toBe(200)
      expect(users[1].name).toBe(user.name)
      expect(user.name).toBe(newPayload?.user.name)
    })
    it('returns status code 200 and updates user email', async () => {
      const user = {
        name: 'John',
        email: 'johndoe@gmail.com',
      }

      const { status } = await updateUser(user)
      const users = await getUsers()

      expect(status).toBe(200)
      expect(users[1].email).toBe(user.email)
    })
  })
})
