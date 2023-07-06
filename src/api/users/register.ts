import { UserRegisterParams as User } from 'types/params'
import { BASE_URL } from '@baseUrl'

export const register = async ({ name, email, password }: User) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  return response
}
