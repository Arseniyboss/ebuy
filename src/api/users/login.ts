import { UserLoginParams } from 'types/params'
import { BASE_URL } from '@baseUrl'

export const login = async (userCredentials: UserLoginParams) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(userCredentials),
  })
  return response
}
