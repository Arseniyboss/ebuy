import { UserLoginParams } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const login = async (userCredentials: UserLoginParams) => {
  return fetchData('/users/login', { method: 'POST', body: userCredentials })
}
