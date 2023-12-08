import { UserRegisterParams as User } from '@/types/params'
import { BASE_URL } from '@/baseUrl'

export const register = async (user: User) => {
  return fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    body: JSON.stringify(user),
  })
}
