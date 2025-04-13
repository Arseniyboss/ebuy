import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { UpdateUserPasswordParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { PUT } from '@/app/api/users/user/change-password/route'
import { seedUsers, getUsers } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import users from '@/mocks/users'

const payload = generatePayload(users[1])

const updateUserPassword = async (formData: UpdateUserPasswordParams) => {
  const url = `${BASE_URL}/api/users/user/change-password`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const { status, statusText, cookies } = await PUT(request)
  const newAccessToken = cookies.get('accessToken')?.value
  return { status, statusText, accessToken: newAccessToken }
}

beforeAll(async () => await seedUsers())

describe('PUT /api/users/user/change-password', () => {
  describe('given the current password is invalid', () => {
    it('returns status code 401', async () => {
      const formData = {
        currentPassword: '12345',
        newPassword: '1234567',
        confirmNewPassword: '1234567',
      }

      const { status, statusText } = await updateUserPassword(formData)

      expect(status).toBe(401)
      expect(statusText).toBe('Current password is invalid')
    })
  })

  describe('given the current password is valid', () => {
    it('returns status code 200 and updates user password', async () => {
      const formData = {
        currentPassword: '123456',
        newPassword: '1234567',
        confirmNewPassword: '1234567',
      }

      const { status } = await updateUserPassword(formData)

      const users = await getUsers()

      const { password } = users[1]
      const isPasswordUpdated = await bcrypt.compare(formData.newPassword, password)

      expect(status).toBe(200)
      expect(isPasswordUpdated).toBeTruthy()
    })
  })
})
