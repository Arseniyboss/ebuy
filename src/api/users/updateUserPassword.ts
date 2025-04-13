import { UpdateUserPasswordParams as FormData } from '@/types/params'
import { fetchData } from '@/utils/api/fetchData'

export const updateUserPassword = async (formData: FormData) => {
  return fetchData('/users/user/change-password', { method: 'PUT', body: formData })
}
