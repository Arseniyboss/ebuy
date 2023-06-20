import { cookies } from 'next/headers'

export const getToken = () => {
  return cookies().get('token')?.value
}
