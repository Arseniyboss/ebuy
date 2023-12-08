import { UpdateUserParams as User } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const updateUser = async (user: User) => {
  return fetchData('/users/user', { method: 'PUT', body: user })
}
