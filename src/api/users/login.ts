import { BASE_URL } from '@baseUrl'
import { UserCredentials } from 'types/user'

export const login = async ({ email, password }: UserCredentials) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return response
}
