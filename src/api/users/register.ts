import { BASE_URL } from '@baseUrl'

type User = {
  name: string
  email: string
  password: string
}

export const register = async ({ name, email, password }: User) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  return response
}
