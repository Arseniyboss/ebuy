import { UpdateUserParams as User } from 'types/params'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/getToken'

export const updateUser = async (user: User) => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/users/user`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
