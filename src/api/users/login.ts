import { UserLoginParams } from '@/types/params'
import { BASE_URL } from '@/baseUrl'

export const login = async (userCredentials: UserLoginParams) => {
  return fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(userCredentials),
  })
}
