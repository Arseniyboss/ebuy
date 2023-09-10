import { User } from 'types/api'
import { BASE_URL } from '@baseUrl'
import { getToken } from '@auth/token/getters/getToken'

export const getUser = async () => {
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api/users/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) return

  const user: User = await response.json()
  return user
}
