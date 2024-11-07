import { User } from '@/types/api'
import { fetchData } from '@/utils/api/fetchData'

export const getUser = async () => {
  return fetchData<User>('/users/user', { tags: ['user'] })
}
