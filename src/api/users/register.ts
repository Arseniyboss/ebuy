import { UserRegisterParams as User } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const register = async (user: User) => {
  return fetchData('/users/register', { method: 'POST', body: user })
}
