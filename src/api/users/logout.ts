import { BASE_URL } from '@/baseUrl'

export const logout = async () => {
  await fetch(`${BASE_URL}/api/users/logout`, { method: 'POST' })
}
