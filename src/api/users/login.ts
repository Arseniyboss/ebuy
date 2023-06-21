import { UserCredentials } from 'types/api'
import { BASE_URL } from '@baseUrl'

export const login = async (UserCredentials: UserCredentials) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(UserCredentials),
  })
  return response
}
