import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { PUT } from '@app/api/users/user/route'
import { seedUsers, getUsers } from '@config/mongoMemoryServer'
import { generateToken } from '@auth/generateToken'
import { verifyToken } from '@auth/verifyToken'
import { BASE_URL } from '@baseUrl'
import { User } from 'types/api'
import users from '@mocks/users'

const updateUser = async (user: User) => {
  const { _id, name } = users[1]
  const token = await generateToken({ id: _id.toString(), name })
  const url = `${BASE_URL}/api/users/user`
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newToken = cookies.get('token')?.value
  return { status, statusText, token: newToken }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/users/user', () => {
  describe('given the user email is already in use', () => {
    it('returns status code 400', async () => {
      const user = {
        name: 'John',
        email: 'jane@example.com',
        password: '',
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
        email: 'john@example.com',
        password: '',
      }

      const { status, token } = await updateUser(user)
      const newPayload = await verifyToken(token)
      const users = await getUsers()

      expect(status).toBe(200)
      expect(users[1].name).toBe(user.name)
      expect(user.name).toBe(newPayload?.name)
    })
    it('returns status code 200 and updates user email', async () => {
      const user = {
        name: 'John',
        email: 'johndoe@example.com',
        password: '',
      }

      const { status } = await updateUser(user)
      const users = await getUsers()

      expect(status).toBe(200)
      expect(users[1].email).toBe(user.email)
    })
    it('returns status code 200 and updates user password', async () => {
      const user = {
        name: 'John',
        email: 'john@example.com',
        password: '12345678',
      }

      const { status } = await updateUser(user)
      const users = await getUsers()

      const { password } = users[1]
      const isPasswordUpdated = await bcrypt.compare(user.password, password)

      expect(status).toBe(200)
      expect(isPasswordUpdated).toBeTruthy()
    })
  })
})
